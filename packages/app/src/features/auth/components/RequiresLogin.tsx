"use client";

import { ShieldAlt2 } from "@styled-icons/boxicons-solid";
import { ReactNode } from "react";
import { Button } from "../../../components/Button";
import { VSpacer } from "../../../components/VSpacer";
import { Error } from "../../../components/Error";
import { Centered } from "../../../components/Centered";

export function RequiresLogin(): ReactNode {
  return <>
    <Error icon={ShieldAlt2}>
      This page requires you to log in to view it
    </Error>
    <VSpacer size="8" />
    <Centered>
      <Button $size="large" $variant="primary">Log in</Button>
    </Centered>
  </>;
}
