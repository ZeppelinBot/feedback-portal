import styled, { css } from "styled-components";
import { ds } from "../style/designSystem";
import { atBreakpoint } from "../style/breakpoints";

export const Container = styled.div`
  width: 100%;
  max-width: ${ds.maxContentWidth};
  margin: 0 auto;
  padding: ${ds.spacing["4"]};

  ${atBreakpoint(ds.breakpoints.sm, css`
    padding: ${ds.spacing["8"]};
  `)}
`;
