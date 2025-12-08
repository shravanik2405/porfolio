export const theme = {
  colors: {
    primary: "#EB5937", // Orange
    secondary: "#353531", // Dark Grey / Black (Now using secondaryDark everywhere)
    secondaryDark: "#353531", // Slightly different dark grey (used in Section 2 currently)
    textLight: "#ffffff",
    textDark: "#2D2D2D",
  },
  gradients: {
    splitBackground: (topColor: string, bottomColor: string) =>
      `linear-gradient(to bottom, ${topColor} 50%, ${bottomColor} 50%)`,
  },
};
