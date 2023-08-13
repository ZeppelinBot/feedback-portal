"use client";

import "@fontsource-variable/inter";
import { ReactNode } from "react";
import { BaseStyles } from "../src/features/style/BaseStyles";
import { MainHeader } from "./MainHeader";
import { Container } from "../src/components/Container";
import { MobileFooter } from "./MobileFooter";

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
