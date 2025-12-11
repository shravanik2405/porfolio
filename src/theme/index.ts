export const theme = {
  colors: {
    primary: "#ffc785",
    secondary: "#292926", // Dark Grey / Black (Now using secondaryDark everywhere)
    textLight: "#ffffff",
    textDark: "#2D2D2D",
  },
  gradients: {
    splitBackground: (topColor: string, bottomColor: string) =>
      `linear-gradient(to bottom, ${topColor} 50%, ${bottomColor} 50%)`,
  },
};
