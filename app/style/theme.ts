import { FlattenInterpolation, css } from "styled-components";

export function inLightTheme(input: FlattenInterpolation<any> | string): FlattenInterpolation<any> {
  return css`
    @media (prefers-color-scheme: light) {
      ${input}
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

export function inDarkTheme(input: FlattenInterpolation<any> | string): FlattenInterpolation<any> {
  return css`
    @media (prefers-color-scheme: dark) {
      ${input}
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

export function inRootLightTheme(input: FlattenInterpolation<any> | string): FlattenInterpolation<any> {
  return css`
    @media (prefers-color-scheme: light) {
      ${input}
    }

    .__theme-light {
      ${input}
    }
  `;
}

export function inRootDarkTheme(input: FlattenInterpolation<any> | string): FlattenInterpolation<any> {
  return css`
    @media (prefers-color-scheme: dark) {
      ${input}
    }

    .__theme-dark {
      ${input}
    }
  `;
}
