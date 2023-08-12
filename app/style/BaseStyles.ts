import { createGlobalStyle } from "styled-components";
import { ds } from "./designSystem";
import { cssColorVariables } from "./colors";

// Base styles
export const BaseStyles = createGlobalStyle`
  :root {
    ${cssColorVariables}
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
  }
`;
