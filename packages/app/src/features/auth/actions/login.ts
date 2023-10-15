"use server";

import { redirect } from "next/navigation";
import { session, withSession } from "../../session/session";
import { generateAuthorizationUrl } from "../auth";

export const login = withSession(async () => {
  const { url, codeVerifier } = generateAuthorizationUrl("identify guilds.members.read");
  session().set("codeVerifier", codeVerifier);
  return redirect(url);
});
