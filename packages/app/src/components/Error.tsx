"use client";

import { ReactNode } from "react";
import styled, { css } from "styled-components";
import { ds } from "../features/style/designSystem";
import { atBreakpoint } from "../features/style/breakpoints";
import { useBreakpoint } from "../features/style/useBreakpoint";

const Wrapper = styled.div`
  display: flex;
  gap: 16px;
  justify-content: center;
  align-items: center;

  font-size: 14px;
  font-weight: 500;

  ${atBreakpoint(ds.breakpoints.lg, css`
    font-size: 24px;
    font-weight: 400;
  `)}
`;

type ErrorProps = {
  icon?: (props: { size?: number }) => ReactNode;
  children: ReactNode;
};

export function Error(props: ErrorProps) {
  const isMobile = useBreakpoint(ds.breakpoints.lg, true);
  const iconSize = isMobile ? 24 : 48;

  return (
    <Wrapper>
      {props.icon && <div><props.icon size={iconSize} /></div>}
      <div>{props.children}</div>
    </Wrapper>
  );
}
