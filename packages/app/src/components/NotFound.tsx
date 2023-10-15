"use client";

import { Error as ErrorIcon } from "@styled-icons/boxicons-solid";
import { ReactNode } from "react";
import { Error } from "./Error";

type NotFoundProps = {
  message?: ReactNode;
};

export function NotFound(props: NotFoundProps): ReactNode {
  return <>
    <Error icon={ErrorIcon}>
      {props.message ?? "Not found"}
    </Error>
  </>;
}
