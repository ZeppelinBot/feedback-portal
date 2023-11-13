"use client";

import { ShieldAlt2 } from "@styled-icons/boxicons-solid";
import { ReactNode } from "react";
import { Button } from "../../../components/Button";
import { VSpacer } from "../../../components/VSpacer";
import { Error } from "../../../components/Error";
import { Centered } from "../../../components/Centered";
import { login } from "../actions/login";

export function RequiresLogin(): ReactNode {
  return <>
    <Error icon={ShieldAlt2}>
      You need to log in to view this page
    </Error>
    <VSpacer size="8" />
    <Centered>
      <form action={login}>
        <Button $size="large" $variant="primary">Log in</Button>
      </form>
    </Centered>
  </>;
}
