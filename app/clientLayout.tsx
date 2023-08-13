"use client";

import "@fontsource-variable/inter";
import { ReactNode } from "react";
import { BaseStyles } from "../src/features/style/BaseStyles";
// import { MainHeader } from "./MainHeader";
import { Container } from "../src/components/Container";
import { MobileFooter } from "./MobileFooter";

type ClientLayoutProps = {
  header: ReactNode;
  children: ReactNode;
};

export function ClientLayout(props: ClientLayoutProps) {
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
