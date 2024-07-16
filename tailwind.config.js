/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.tsx", "./src/**/*.css"],
  plugins: [require("@tailwindcss/forms")],
  theme: {
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
      tahiti: {
        100: "#cffafe",
        200: "#a5f3fc",
        300: "#67e8f9",
        400: "#22d3ee",
        500: "#06b6d4",
        600: "#0891b2",
        700: "#0e7490",
        800: "#155e75",
        900: "#164e63",
      },
      transparent: "transparent",
    },
  },
};
