// Design token constants
export const colors = {
  // Light Mode
  light: {
    primary: {
      50: "#F5F6F2", // Figma's light neutral
      100: "#E4E7DE",
      500: "#4A6546", // Figma's primary green
      900: "#2F3E2C",
    },
    surface: "#FFFFFF",
    text: {
      primary: "#2D2D2D", // Figma's main text
      secondary: "#5A5A5A",
    },
  },

  // Dark Mode
  dark: {
    primary: {
      50: "#2F3E2C",
      100: "#4A6546",
      500: "#8BA989", // Desaturated dark mode primary
      900: "#E4E7DE",
    },
    surface: "#1A1A1A",
    text: {
      primary: "#F5F6F2",
      secondary: "#D1D5CE",
    },
  },

  // Common colors
  common: {
    white: "#ffffff",
    black: "#000000",
    accent: "#C17D4A", // Figma's accent terracotta
    error: "#B53E3E",
    success: "#4A6546",
  },
} as const;
