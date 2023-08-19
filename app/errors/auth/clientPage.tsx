"use client";

import { ErrorAlt } from "@styled-icons/boxicons-solid";
import { Error } from "../../../src/features/Error";

type AuthErrorClientPageProps = {
  error?: string;
};

export function AuthErrorClientPage(props: AuthErrorClientPageProps) {
  if (props.error === "AccessDenied") {
    return <Error icon={ErrorAlt}>
      You must be a "Bot User" on the Zeppelin Discord to log in to the feedback portal
    </Error>;
  }

  return <Error icon={ErrorAlt}>
    Login failed
  </Error>;
}
