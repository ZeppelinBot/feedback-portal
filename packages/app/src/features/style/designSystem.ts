import { range } from "../../utils";

type GeneratedColors = {
  "100": string;
  "200": string;
  "300": string;
  "400": string;
  "500": string;
  "600": string;
  "700": string;
  "800": string;
  "900": string;
};

const colorVar = (name: string, value: string) => {
  return `var(--color-${name}-${value})`;
};

const generateColors = (name: string): GeneratedColors => {
  const result: Record<string, string> = {};
  for (const step of range(100, 900, 100)) {
    result[String(step)] = colorVar(name, String(step));
  }
  return result as GeneratedColors;
};

export const ds = {
  breakpoints: {
    sm: "421px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
  },

  maxContentWidth: "1024px",

  spacing: {
    "1": "2px",
    "2": "4px",
    "3": "6px",
    "4": "8px",
    "5": "12px",
    "6": "16px",
    "7": "24px",
    "8": "32px",
    "9": "48px",
    "10": "64px",
  },

  text: {
    fonts: {
      heading: "normal 16px/1.4 'Inter Variable', system-ui, sans-serif",
      body: "normal 16px/1.4 'Inter Variable', system-ui, sans-serif",
    },
    sizes: {
      desktopBody: "16px",
      mobileBody: "14px",
      h1: "28px",
      h2: "26px",
      h3: "23px",
      h4: "21px",
      h5: "19px",
      h6: "18px",
    },
  },

  colorPresets: {
    bodyText: "var(--color-gray-900)",
    link: "var(--color-blue-700)",
    background: "var(--color-gray-100)",
  },

  // Variables are generated in colors.ts
  colors: {
    gray: {
      dynamic: {
        ...generateColors("gray"),
        "0": colorVar("gray", "0"),
        "1000": colorVar("gray", "1000"),
      },
      light: generateColors("light-gray"),
      dark: generateColors("dark-gray"),
    },
    blue: {
      dynamic: generateColors("blue"),
      light: generateColors("light-blue"),
      dark: generateColors("dark-blue"),
    },
    green: {
      dynamic: generateColors("green"),
      light: generateColors("light-green"),
      dark: generateColors("dark-green"),
    },
    red: {
      dynamic: generateColors("red"),
      light: generateColors("light-red"),
      dark: generateColors("dark-red"),
    },
    white: {
      dynamic: "",
      light: "white",
      dark: "black",
    },
  },
} as const;
