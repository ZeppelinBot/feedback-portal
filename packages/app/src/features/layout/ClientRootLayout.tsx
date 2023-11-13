"use client";

import "@fontsource-variable/inter";
import { ReactNode } from "react";
import { BaseStyles } from "../style/BaseStyles";
import { Container } from "../../components/Container";
import styled, { css } from "styled-components";
import { ds } from "../style/designSystem";
import { atBreakpoint } from "../style/breakpoints";
import { mobileFooterHeight, mobileHeaderHeight } from "./values";

const Content = styled.main`
  margin-top: calc(${mobileHeaderHeight} + 24px);
  margin-bottom: calc(${mobileFooterHeight} + 24px);

  ${atBreakpoint(ds.breakpoints.lg, css`
    margin-top: 0;
    margin-bottom: 0;
  `)}
`;

type ClientLayoutProps = {
  desktopHeader: ReactNode;
  mobileFooter: ReactNode;
  mobileHeader: ReactNode;
  statusArea: ReactNode;
  children: ReactNode;
};

export function ClientRootLayout(props: ClientLayoutProps) {
  return <>
    <BaseStyles />

    <Container>
      {props.desktopHeader}
      {props.mobileHeader}
      {props.statusArea}
      {props.mobileFooter}

      <Content>
        {props.children}
      </Content>
    </Container>
  </>;
}
