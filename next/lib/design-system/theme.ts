import { colors } from "./colors";

export type ThemeMode = "light" | "dark";
export type ColorScheme = typeof colors.light & typeof colors.dark;

export const theme = (mode: ThemeMode) => ({
  color: {
    ...colors.common,
    ...colors[mode],
  },
  spacing: {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "32px",
  },
  typography: {
    fontSize: {
      h1: "2.25rem",
      h2: "1.875rem",
      h3: "1.5rem",
      body: "1rem",
    },
    fontFamily: "Sofia Sans, sans-serif",
    lineHeights: {
      tight: 1.2,
      normal: 1.5,
    },
  },
  shadows: {
    sm: "0 1px 3px rgba(0,0,0,0.12)",
    md: "0 3px 6px rgba(0,0,0,0.15)",
  },
});
