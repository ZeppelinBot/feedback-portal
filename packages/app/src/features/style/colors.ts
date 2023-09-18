import { css } from "styled-components";
import { keys } from "../../utils";
import { inDarkTheme, inLightTheme, inRootDarkTheme, inRootLightTheme } from "./theme";

const colors = {
  gray: {
    "0": {
      light: "white",
      dark: "black",
    },
    "100": {
      light: "hsl(213, 50%, 99%)",
      dark: "hsl(213, 8%, 10%)",
    },
    "200": {
      light: "hsl(213, 30%, 95%)",
      dark: "hsl(213, 8%, 15%)",
    },
    "300": {
      light: "hsl(213, 25%, 85%)",
      dark: "hsl(213, 8%, 25%)",
    },
    "400": {
      light: "hsl(213, 15%, 65%)",
      dark: "hsl(213, 8%, 40%)",
    },
    "500": {
      light: "hsl(213, 10%, 50%)",
      dark: "hsl(213, 10%, 50%)",
    },
    "600": {
      light: "hsl(213, 8%, 40%)",
      dark: "hsl(213, 15%, 65%)",
    },
    "700": {
      light: "hsl(213, 8%, 25%)",
      dark: "hsl(213, 25%, 85%)",
    },
    "800": {
      light: "hsl(213, 8%, 15%)",
      dark: "hsl(213, 30%, 95%)",
    },
    "900": {
      light: "hsl(213, 8%, 10%)",
      dark: "hsl(213, 50%, 99%)",
    },
    "1000": {
      light: "black",
      dark: "white",
    },
  },

  blue: {
    "100": {
      light: "hsl(202.1, 82.6%, 95.5%)",
      dark: "hsl(202.1, 67.1%, 16.7%)",
    },
    "200": {
      light: "hsl(202.5, 82.4%, 86.7%)",
      dark: "hsl(202.3, 66.2%, 27.8%)",
    },
    "300": {
      light: "hsl(202.1, 84.1%, 77.8%)",
      dark: "hsl(202.3, 66.7%, 38.8%)",
    },
    "400": {
      light: "hsl(202.3, 83.4%, 64.5%)",
      dark: "hsl(202.2, 66.9%, 49.8%)",
    },
    "500": {
      light: "hsl(202.2, 83.3%, 55.5%)",
      dark: "hsl(202.2, 83.3%, 55.5%)",
    },
    "600": {
      light: "hsl(202.2, 66.9%, 49.8%)",
      dark: "hsl(202.3, 83.4%, 64.5%)",
    },
    "700": {
      light: "hsl(202.3, 66.7%, 38.8%)",
      dark: "hsl(202.1, 84.1%, 77.8%)",
    },
    "800": {
      light: "hsl(202.3, 66.2%, 27.8%)",
      dark: "hsl(202.5, 82.4%, 86.7%)",
    },
    "900": {
      light: "hsl(202.1, 67.1%, 16.7%)",
      dark: "hsl(202.1, 82.6%, 95.5%)",
    },
  },

  green: {
    "100": {
      light: "hsl(95, 82.6%, 90%)",
      dark: "hsl(95, 67.1%, 16.7%)",
    },
    "200": {
      light: "hsl(95, 82.4%, 80%)",
      dark: "hsl(95, 66.2%, 27.8%)",
    },
    "300": {
      light: "hsl(95, 84.1%, 65%)",
      dark: "hsl(95, 66.7%, 38.8%)",
    },
    "400": {
      light: "hsl(95, 83.4%, 55%)",
      dark: "hsl(95, 66.9%, 49.8%)",
    },
    "500": {
      light: "hsl(95, 83.3%, 45%)",
      dark: "hsl(95, 83.3%, 55.5%)",
    },
    "600": {
      light: "hsl(95, 66.9%, 38%)",
      dark: "hsl(95, 83.4%, 64.5%)",
    },
    "700": {
      light: "hsl(95, 66.7%, 32%)",
      dark: "hsl(95, 84.1%, 77.8%)",
    },
    "800": {
      light: "hsl(95, 66.2%, 25%)",
      dark: "hsl(95, 82.4%, 86.7%)",
    },
    "900": {
      light: "hsl(95, 67.1%, 15%)",
      dark: "hsl(95, 82.6%, 95.5%)",
    },
  },

  red: {
    "100": {
      light: "hsl(0, 82.6%, 95.5%)",
      dark: "hsl(0, 69.4%, 21.8%)",
    },
    "200": {
      light: "hsl(0, 82.9%, 86.3%)",
      dark: "hsl(0, 70.1%, 32.7%)",
    },
    "300": {
      light: "hsl(0, 84.3%, 77.5%)",
      dark: "hsl(0, 69.5%, 43.7%)",
    },
    "400": {
      light: "hsl(0, 83.8%, 63.7%)",
      dark: "hsl(0, 69.6%, 49%)",
    },
    "500": {
      light: "hsl(0, 83.6%, 54.5%)",
      dark: "hsl(0, 83.6%, 54.5%)",
    },
    "600": {
      light: "hsl(0, 69.6%, 49%)",
      dark: "hsl(0, 83.8%, 63.7%)",
    },
    "700": {
      light: "hsl(0, 69.5%, 43.7%)",
      dark: "hsl(0, 84.3%, 77.5%)",
    },
    "800": {
      light: "hsl(0, 70.1%, 32.7%)",
      dark: "hsl(0, 82.9%, 86.3%)",
    },
    "900": {
      light: "hsl(0, 69.4%, 21.8%)",
      dark: "hsl(0, 82.6%, 95.5%)",
    },
  },
} as const;

// Generate color variables
const lightThemeColors = [];
const darkThemeColors = [];
const staticColors = [];

for (const colorName of keys(colors)) {
  for (const shade of keys(colors[colorName])) {
    const staticLightCssVariableName = `--color-light-${colorName}-${shade}`;
    const staticDarkCssVariableName = `--color-dark-${colorName}-${shade}`;
    staticColors.push(`${staticLightCssVariableName}: ${colors[colorName][shade].light};`);
    staticColors.push(`${staticDarkCssVariableName}: ${colors[colorName][shade].dark};`);

    const cssVariableName = `--color-${colorName}-${shade}`;
    lightThemeColors.push(`${cssVariableName}: var(${staticLightCssVariableName});`);
    darkThemeColors.push(`${cssVariableName}: var(${staticDarkCssVariableName});`);
  }
}

export const cssColorVariables = css`
  ${staticColors.join("\n")}

  ${inRootLightTheme(lightThemeColors.join("\n"))}
  ${inRootDarkTheme(darkThemeColors.join("\n"))}
`;
