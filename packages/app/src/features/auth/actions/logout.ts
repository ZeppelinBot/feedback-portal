"use server";

import { redirect } from "next/navigation";
import { session, withSession } from "../../session/session";
import { getCurrentLoginSession } from "../auth";
import { loginSessions } from "../repositories/loginSessions";
import { actionError } from "../../../utils/actionError";

export const logout = withSession(async () => {
  const loginSession = await getCurrentLoginSession();
  if (! loginSession) {
    return actionError("", "Not logged in");
  }
  await loginSessions.markAsExpired(loginSession.id);
  session().delete("loginSessionId");
  return redirect("/");
});
