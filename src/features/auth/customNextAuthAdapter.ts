import type { Adapter } from "@auth/core/adapters";
import { getOrm } from "../../orm";
import { Collection, wrap } from "@mikro-orm/core";
import { User } from "./entities/User";
import { Account } from "./entities/Account";
import { Session } from "./entities/Session";
import { VerificationToken } from "./entities/VerificationToken";
import { defaultRole } from "./roles";

// Heavily based on @auth/mikro-orm-adapter
// We made our own so we can:
// 1. Use our own entities that use EntitySchemas rather than decorated entity classes
// 2. Use our own, already-existing ORM instance
export const customNextAuthAdapter: Adapter = {
  async createUser(data) {
    const em = (await getOrm()).em.fork();
    const user = em.create(User, {
      ...data,
      role: defaultRole,
    });
    await em.persistAndFlush(user);

    return wrap(user).toObject();
  },

  async getUser(id) {
    const em = (await getOrm()).em.fork();
    const user = await em.findOne(User, { id });
    return user ? wrap(user).toObject() : null;
  },

  async getUserByEmail(email) {
    const em = (await getOrm()).em.fork();
    const user = await em.findOne(User, { email });
    return user ? wrap(user).toObject() : null;
  },

  async getUserByAccount({ provider, providerAccountId }) {
    const em = (await getOrm()).em.fork();
    const account = await em.findOne(Account, {
      provider,
      providerAccountId,
    }, {
      populate: ["user"],
    });
    return account?.user ?? null;
  },

  async updateUser(data) {
    const em = (await getOrm()).em.fork();
    const user = await em.findOne(User, { id: data.id });
    if (! user) {
      throw new Error("User not found");
    }
    wrap(user).assign(data, { mergeObjects: true });
    await em.persistAndFlush(user);

    return wrap(user).toObject();
  },

  async deleteUser(id) {
    const em = (await getOrm()).em.fork();
    const user = await em.findOne(User, { id });
    if (user) {
      await em.removeAndFlush(user);
    }
  },

  async linkAccount(data) {
    const em = (await getOrm()).em.fork();
    const user = await em.findOne(User, { id: data.userId });
    if (! user) {
      throw new Error("User not found");
    }

    const account = em.create(Account, data);
    user.accounts = new Collection<Account>(user);
    user.accounts.add(account);
    await em.persistAndFlush(user);
  },

  async unlinkAccount({ provider, providerAccountId }) {
    const em = (await getOrm()).em.fork();
    const account = await em.findOne(Account, {
      provider,
      providerAccountId,
    });
    if (! account) {
      throw new Error("Account not found");
    }

    await em.removeAndFlush(account);
  },

  async getSessionAndUser(sessionToken) {
    const em = (await getOrm()).em.fork();
    const session = await em.findOne(Session, { sessionToken }, { populate: ["user"] });
    if (! session?.user) {
      return null;
    }

    return {
      session: wrap(session).toObject(),
      user: wrap(session.user).toObject(),
    };
  },

  async createSession(data) {
    const em = (await getOrm()).em.fork();
    const user = await em.findOne(User, { id: data.userId });
    if (! user) {
      throw new Error("User not found");
    }

    const session = em.create(Session, data);
    wrap(session).assign(data);
    user.sessions = new Collection<Session>(user);
    user.sessions.add(session);
    await em.persistAndFlush(session);

    return wrap(session).toObject();
  },

  async updateSession(data) {
    const em = (await getOrm()).em.fork();
    const session = await em.findOne(Session, { sessionToken: data.sessionToken });
    if (! session) {
      throw new Error("Session not found");
    }
    wrap(session).assign(data);
    await em.persistAndFlush(session);

    return wrap(session).toObject();
  },

  async deleteSession(sessionToken) {
    const em = (await getOrm()).em.fork();
    const session = await em.findOne(Session, { sessionToken: sessionToken });
    if (session) {
      await em.removeAndFlush(session);
    }
  },

  async createVerificationToken(data) {
    const em = (await getOrm()).em.fork();
    const token = em.create(VerificationToken, data);
    wrap(token).assign(data);
    await em.persistAndFlush(token);

    return wrap(token).toObject();
  },

  async useVerificationToken(params) {
    const em = (await getOrm()).em.fork();
    const token = await em.findOne(VerificationToken, params);
    if (! token) {
      return null;
    }

    await em.removeAndFlush(token);
    return wrap(token).toObject();
  },
};
