import { Issuer, generators } from "openid-client";
import { env } from "../../env";
import { RESTGetAPICurrentUserResult } from "@discordjs/core";
import { session } from "../session/session";
import { loginSessions } from "./repositories/loginSessions";
import { users } from "./repositories/users";

const redirectUri = `${env.ROOT_URL}/api/auth/callback`;

const discordIssuer = new Issuer({
  issuer: "discord",
  authorization_endpoint: "https://discord.com/oauth2/authorize",
  token_endpoint: "https://discord.com/api/oauth2/token",
  revocation_endpoint: "https://discord.com/api/oauth2/token/revoke",
  userinfo_endpoint: "https://discord.com/api/users/@me",
});

const oauthClient = new discordIssuer.Client({
  client_id: env.DISCORD_CLIENT_ID,
  client_secret: env.DISCORD_CLIENT_SECRET,
  redirect_uris: [redirectUri],
  response_types: ["code"],
});

type AuthorizationUrlResult = {
  url: string;
  codeVerifier: string;
};

export function generateAuthorizationUrl(scope: string): AuthorizationUrlResult {
  const codeVerifier = generators.codeVerifier();
  const codeChallenge = generators.codeChallenge(codeVerifier);

  const url = oauthClient.authorizationUrl({
    scope,
    code_challenge: codeChallenge,
    code_challenge_method: "S256",
  });

  return {
    url,
    codeVerifier,
  };
}

export function fetchTokensWithParams(params: any, codeVerifier: string) {
  return oauthClient.oauthCallback(redirectUri, params, { code_verifier: codeVerifier, response_type: "code" });
}

export function fetchUserinfo(accessToken: string): Promise<RESTGetAPICurrentUserResult> {
  return oauthClient.userinfo(accessToken);
}

export async function getCurrentLoginSession() {
  const loginSessionId = session().get("loginSessionId");
  if (! loginSessionId) {
    return null;
  }

  const loginSession = await loginSessions.getById(loginSessionId);
  if (! loginSession || loginSession.expires_at < new Date()) {
    return null;
  }

  return loginSession;
}

export async function getCurrentUser() {
  const loginSession = await getCurrentLoginSession();
  if (! loginSession) {
    return null;
  }

  return users.getById(loginSession.user_id);
}
