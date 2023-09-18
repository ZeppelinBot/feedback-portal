import styled, { RuleSet, css } from "styled-components";

export function inLightTheme(input: RuleSet<object> | string): RuleSet<object> {
  return css`
    @media (prefers-color-scheme: light) {
      &&:not(.__theme-dark &&) {
        ${input}
      }
    }

    &.__theme-light {
      ${input}
    }

    /* && is needed dynamic components: https://github.com/styled-components/styled-components/issues/3244#issuecomment-687676703 */
    .__theme-light && {
      ${input}
    }
  `;
}

export function inDarkTheme(input: RuleSet<object> | string): RuleSet<object> {
  return css`
    @media (prefers-color-scheme: dark) {
      &&:not(.__theme-light &&) {
        ${input}
      }
    }

    &.__theme-dark {
      ${input}
    }

    /* && is needed dynamic components: https://github.com/styled-components/styled-components/issues/3244#issuecomment-687676703 */
    .__theme-dark && {
      ${input}
    }
  `;
}

export function inRootLightTheme(input: RuleSet<object> | string): RuleSet<object> {
  return css`
    @media (prefers-color-scheme: light) {
      ${input}
    }

    .__theme-light {
      ${input}
    }
  `;
}

export function inRootDarkTheme(input: RuleSet<object> | string): RuleSet<object> {
  return css`
    @media (prefers-color-scheme: dark) {
      ${input}
    }

    .__theme-dark {
      ${input}
    }
  `;
}

export const onlyInLightThemeClass = "__only-in-light-theme";
export const onlyInDarkThemeClass = "__only-in-dark-theme";
