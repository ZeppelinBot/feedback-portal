"use client";

import { css, styled } from "styled-components";
import { atBreakpoint } from "../../style/breakpoints";
import { ds } from "../../style/designSystem";

const FeedbackPlaceholderWrapper = styled.div`
  ${atBreakpoint(ds.breakpoints.lg, css`
    padding-top: 52px;
  `)}
`;

export function FeedbackPlaceholder() {
  return (
    <FeedbackPlaceholderWrapper>Loading...</FeedbackPlaceholderWrapper>
  );
}
