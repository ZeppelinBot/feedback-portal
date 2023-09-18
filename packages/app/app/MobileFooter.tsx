import { ReactNode } from "react";
import styled, { css } from "styled-components";
import { atBreakpoint } from "../src/features/style/breakpoints";
import { ds } from "../src/features/style/designSystem";

const MobileFooterWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;

  ${atBreakpoint(ds.breakpoints.sm, css`
    display: none;
  `)}
`;

export function MobileFooter(): ReactNode {
  return (
    <MobileFooterWrapper>
      Hello
    </MobileFooterWrapper>
  );
}
