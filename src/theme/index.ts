export const theme = {
  colors: {
    primary: "#ffc785",
    secondary: "#292926", // Dark Grey / Black (Now using secondaryDark everywhere)
    textLight: "#ffffff",
    textDark: "#2D2D2D",
    shadow: "rgba(0, 0, 0, 0.7)",
  },
  fonts: {
    primary: '"Mochiy Pop P One", sans-serif',
  },
  gradients: {
    splitBackground: (topColor: string, bottomColor: string) =>
      `linear-gradient(to bottom, ${topColor} 60%, ${bottomColor} 40%)`,
  },
};
