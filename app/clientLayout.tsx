"use client";

import "@fontsource-variable/inter";
import { ReactNode } from "react";
import { BaseStyles } from "./style/BaseStyles";
import { MainHeader } from "./components/MainHeader";
import { Container } from "./components/Container";
import { VSpacer } from "./components/VSpacer";
import { MobileFooter } from "./components/MobileFooter";

type ClientLayoutProps = {
  children: ReactNode;
};

export function ClientLayout({ children }: ClientLayoutProps) {
  return <>
    <BaseStyles />

    <Container>
      <MainHeader />
      <MobileFooter />

      {/* Content */}
      <main>
        {children}
      </main>
    </Container>
  </>;
}
