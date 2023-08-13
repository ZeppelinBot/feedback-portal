"use client";

import { css, styled } from "styled-components";
import { atBreakpoint } from "../style/breakpoints";
import { ds } from "../style/designSystem";

const FeedbackPlaceholderWrapper = styled.div`
  ${atBreakpoint(ds.breakpoints.md, css`
    margin-top: 52px;
  `)}
`;

export function FeedbackPlaceholder() {
  return (
    <FeedbackPlaceholderWrapper>Loading...</FeedbackPlaceholderWrapper>
  );
}
