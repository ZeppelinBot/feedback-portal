"use server";

import { redirect } from "next/navigation";
import { session, withSession } from "../../session/session";
import { getCurrentLoginSession } from "../auth";
import { loginSessions } from "../repositories/loginSessions";
import { actionError } from "../../../utils/actionError";
import { errorTypes } from "../../statusMessages/errorMessages";

export const logout = withSession(async () => {
  const loginSession = await getCurrentLoginSession();
  if (! loginSession) {
    return actionError("", errorTypes.notLoggedIn);
  }
  await loginSessions.markAsExpired(loginSession.id);
  session().delete("loginSessionId");
  return redirect("/");
});
