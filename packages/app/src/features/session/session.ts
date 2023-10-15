import { cookies } from "next/headers";
import Iron from "@hapi/iron";
import { z } from "zod";
import { env } from "../../env";

const SESSION_COOKIE_NAME = "session";
const SESSION_COOKIE_LIFETIME = 60 * 60 * 24 * 30; // 30 days
const SESSION_COOKIE_SECURE = (process.env.NODE_ENV === "production");

const zSessionData = z.object({
  codeVerifier: z.string(),
  loginSessionId: z.string(),
}).partial();

export type SessionData = z.output<typeof zSessionData>;

type SessionInterface = {
  get: <Key extends keyof SessionData>(key: Key) => SessionData[Key];
  set: <Key extends keyof SessionData>(key: Key, value: SessionData[Key]) => void;
  delete: <Key extends keyof SessionData>(key: Key) => void;
  save: () => void;
};

const asyncSessionDataStorage = new AsyncLocalStorage<{ session: SessionInterface }>();

async function getSessionData(): Promise<SessionData> {
  if (! cookies().has(SESSION_COOKIE_NAME)) {
    return {};
  }
  const cookie = cookies().get(SESSION_COOKIE_NAME)!;
  const data = await Iron.unseal(cookie.value, env.SECRET, Iron.defaults).catch(() => null);
  const parsed = zSessionData.safeParse(data);
  return parsed.success ? parsed.data : {};
}

async function saveSessionData(data: SessionData) {
  const sealed = await Iron.seal(data, env.SECRET, Iron.defaults);
  cookies().set(SESSION_COOKIE_NAME, sealed, {
    maxAge: SESSION_COOKIE_LIFETIME,
    httpOnly: true,
    secure: SESSION_COOKIE_SECURE,
  });
}

type AnyFn = (...params: any[]) => any;
type WrappedFn<Fn extends AnyFn> = (...params: Parameters<Fn>) => Promise<Awaited<ReturnType<Fn>>>;

/**
 * To use session data in a server component or route handler, it needs to be wrapped with withSession().
 *
 * Example:
 * ```
 * export const GET = withSession(() => {
 *   const myValue = session().get("myValue");
 *   return Response.json({ myValue });
 * });
 * ```
 */
export function withSession<Fn extends AnyFn>(fn: Fn): WrappedFn<Fn> {
  return async (...args) => {
    let hasChanged = false;
    const sessionData = await getSessionData();
    const sessionInterface: SessionInterface = {
      get(key) {
        return sessionData[key];
      },
      set(key, value) {
        sessionData[key] = value;
        hasChanged = true;
      },
      delete(key) {
        delete sessionData[key];
        hasChanged = true;
      },
      /**
       * Force-save the session to a cookie.
       * You only need to call this function manually in specific cases, such as right before redirecting from a server action.
       */
      async save() {
        await saveSessionData(sessionData);
        hasChanged = false;
      },
    };

    return asyncSessionDataStorage.run({ session: sessionInterface }, () => {
      return Promise.resolve(fn(...args))
        .finally(async () => {
          if (hasChanged) {
            await saveSessionData(sessionData);
          }
        })
    });
  };
}

/**
 * An interface to access session data
 */
export function session(): SessionInterface {
  const store = asyncSessionDataStorage.getStore();
  if (! store) {
    throw new Error("session() must be called within withSession()");
  }
  return store.session;
}
