const tintColorLight = "#2196F3"; // Vibrant blue for light theme
const tintColorDark = "#90CAF9"; // Lighter blue for dark theme

export default {
  light: {
    text: "#0D253F", // Dark navy to complement the blue tint
    background: "#FFFFFF",
    tint: tintColorLight,
    tabIconDefault: "#999999",
    tabIconSelected: tintColorLight,
    textInputBackground: "#f2f5f8",
  },
  dark: {
    text: "#E3F2FD", // Very light blue-tinted white for dark mode
    background: "#121212",
    tint: tintColorDark,
    tabIconDefault: "#999999",
    tabIconSelected: tintColorDark,
    textInputBackground: "#1e1e1e",
  },
};
