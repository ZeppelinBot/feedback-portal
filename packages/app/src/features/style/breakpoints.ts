import { RuleSet, css } from "styled-components";
import { ds } from "./designSystem";

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

export const bpUtilityCss: Array<RuleSet<object>> = [];
for (const [name, minWidth] of Object.entries(ds.breakpoints)) {
  bpUtilityCss.push(untilBreakpoint(minWidth, css`
    .__hidden-until-${name} {
      display: none;
    }
  `));
  bpUtilityCss.push(atBreakpoint(minWidth, css`
    .__hidden-after-${name} {
      display: none;
    }
  `));
}

type BpName = keyof typeof ds.breakpoints;
export type BpUtilityClasses = {
  hiddenUntil: Record<BpName, string>;
  hiddenAfter: Record<BpName, string>;
};

export const bpUtilityClasses: BpUtilityClasses = {
  hiddenUntil: Object.keys(ds.breakpoints).reduce((map, name) => {
    map[name as BpName] = `__hidden-until-${name}`;
    return map;
  }, {} as BpUtilityClasses["hiddenUntil"]),
  hiddenAfter: Object.keys(ds.breakpoints).reduce((map, name) => {
    map[name as BpName] = `__hidden-until-${name}`;
    return map;
  }, {} as BpUtilityClasses["hiddenAfter"]),
};
