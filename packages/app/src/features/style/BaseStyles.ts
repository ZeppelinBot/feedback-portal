import { createGlobalStyle, css } from "styled-components";
import { cssColorVariables } from "./colors";
import { ds } from "./designSystem";
import { inDarkTheme, inLightTheme, inRootLightTheme, onlyInDarkThemeClass, onlyInLightThemeClass } from "./theme";
import { bpUtilityCss } from "./breakpoints";

// Base styles
export const BaseStyles = createGlobalStyle`
  :root {
    ${cssColorVariables}
    ${bpUtilityCss}
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body {
    font: ${ds.text.fonts.body};
    color: ${ds.colorPresets.bodyText};
    background: ${ds.colorPresets.background};
    margin: 0;
  }

  .${onlyInDarkThemeClass} {
    ${inLightTheme(css`
      display: none;
    `)}
  }

  .${onlyInLightThemeClass} {
    ${inDarkTheme(css`
      display: none;
    `)}
  }
`;
