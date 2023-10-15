import { RESTGetCurrentUserGuildMemberResult, Routes } from "@discordjs/core/http-only";
import { fetchTokensWithParams, fetchUserinfo } from "../../auth/auth";
import { session, withSession } from "../../session/session";
import { REST } from "@discordjs/rest";
import { env } from "@src/env";
import { users } from "../repositories/users";
import { loginSessions } from "../repositories/loginSessions";
import { apiError } from "../../../utils/apiError";

export const GET = withSession(async (req: Request) => {
  const codeVerifier = session().get("codeVerifier");
  if (! codeVerifier) {
    return apiError("Missing authentication state", 400);
  }

  // Fetch access token
  const { searchParams } = new URL(req.url);
  const params = Object.fromEntries(searchParams.entries());
  const tokens = await fetchTokensWithParams(params, codeVerifier);
  session().delete("codeVerifier");

  // Verify membership
  const rest = new REST({ version: "10", authPrefix: "Bearer" }).setToken(tokens.access_token!);
  const guildMember = await rest.get(Routes.userGuildMember(env.AUTH_GUILD_ID))
    .catch(() => null) as RESTGetCurrentUserGuildMemberResult | null;

  if (! guildMember) {
    return apiError("You must be a Bot User on the Zeppelin server to log in", 400);
  }
  if (! guildMember.roles.includes(env.AUTH_ROLE_ID)) {
    return apiError("You must be a Bot User on the Zeppelin server to log in", 400);
  }

  // Create/update user
  const userinfo = await fetchUserinfo(tokens.access_token!);
  let user = await users.getUserByDiscordId(userinfo.id);
  if (user) {
    await users.update(user.id, {
      name: userinfo.username,
      avatar: userinfo.avatar,
    });
  } else {
    const userId = await users.createUser(userinfo.id, userinfo.username, userinfo.avatar);
    user = (await users.getById(userId))!;
  }

  // Create login session
  const loginSessionId = await loginSessions.create(user.id);
  session().set("loginSessionId", loginSessionId);

  return Response.redirect(env.ROOT_URL);
});
