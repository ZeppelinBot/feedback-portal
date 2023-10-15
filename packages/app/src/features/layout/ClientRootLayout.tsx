"use client";

import "@fontsource-variable/inter";
import { ReactNode } from "react";
import { BaseStyles } from "../style/BaseStyles";
// import { MainHeader } from "./MainHeader";
import { Container } from "../../components/Container";
import { MobileFooter } from "./MobileFooter";

type ClientLayoutProps = {
  header: ReactNode;
  children: ReactNode;
};

export function ClientRootLayout(props: ClientLayoutProps) {
  return <>
    <BaseStyles />

    <Container>
      {props.header}
      <MobileFooter />

      {/* Content */}
      <main>
        {props.children}
      </main>
    </Container>
  </>;
}
