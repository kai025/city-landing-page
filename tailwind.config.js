/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.tsx", "./src/**/*.css"],
  plugins: [require("@tailwindcss/forms", "@tailwindcss/line-clamp")],
  theme: {
    fontFamily: {
      sans: ["Montserrat", "sans-serif"],
    },
    screens: {
      sm: "640px", // Small devices (e.g., portrait phones)
      md: "768px", // Medium devices (e.g., tablets)
      lg: "1024px", // Large devices (e.g., desktops)
      xl: "1280px", // Extra large devices (e.g., large desktops)
      "2xl": "1536px", // 2x large devices (e.g., very large screens)
    },
    spacing: {
      0: "0px",
      1: "4px",
      2: "8px",
      3: "12px",
      4: "16px",
      5: "24px",
      6: "32px",
      7: "40px",
      8: "48px",
      9: "56px",
      10: "68px",
      11: "72px",
      12: "80px",
      13: "88px",
      14: "96px",
      15: "104px",
      16: "112px",
      17: "120px",
      18: "128px",
      19: "136px",
      20: "144px",
    },
    colors: {
      white: colors.white,
      black: colors.black,
      gray: colors.gray,
      brandblue: "#4AA8DD",
      brandgold: "#C9BC4B",
      brandgreen: "#3EB2A5",
      branddeepblue: "#002C3C",
      blue: {
        900: "#37bee9",
        800: "#5AC1EA",
        700: "#6CD5F0",
        600: "#7EE2F6",
        500: "#8EF6FA",
        400: "#A0F9FF",
        300: "#B7F9FF",
        200: "#C9F9FF",
        100: "#E0F9FF",
      },
      gold: {
        900: "#C9BC4B",
        800: "#d3c24b",
        700: "#d8c75e",
        600: "#ddcd70",
        500: "#e1d584",
        400: "#e6dc97",
        300: "#ebe2ab",
        200: "#ebe2ab",
        100: "#f5f0d4",
      },
      green: {
        900: "#26bea7",
        800: "#3bc3b1",
        700: "#51c9b8",
        600: "#66cec0",
        500: "#7cd5c8",
        400: "#91dcd1",
        300: "#a8e3d9",
        200: "#bce8e3",
        100: "#d4f0ec",
      },
      deepblue: {
        900: "#01243e",
        800: "#103a53",
        700: "#224f66",
        600: "#36647b",
        500: "#4b7a8e",
        400: "#6390a3",
        300: "#7fa6b6",
        200: "#9cbcc9",
        100: "#bad3db",
      },
      transparent: "transparent",
    },
  },
};
