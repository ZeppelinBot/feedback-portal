import { ReactNode } from "react";
import { RuleSet, css } from "styled-components";
import { useBreakpoint } from "./useBreakpoint";

export function atBreakpoint(bp: string, input: RuleSet<object> | string): RuleSet<object> {
  return css`
    @media (min-width: ${bp}) {
      ${input}
    }
  `;
}

export function untilBreakpoint(bp: string, input: RuleSet<object> | string): RuleSet<object> {
  return css`
    @media (max-width: calc(${bp} - 1px)) {
      ${input}
    }
  `;
}

type BpToggleProps = {
  bp: string;
  children: ReactNode;
};

export function HiddenUntil(props: BpToggleProps) {
  const matches = useBreakpoint(props.bp);
  return matches ? props.children : undefined;
}

export function HiddenAfter(props: BpToggleProps) {
  const matches = useBreakpoint(props.bp, true);
  return matches ? props.children : undefined;
}
