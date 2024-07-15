module.exports = {
  content: ["./src/**/*.tsx", "./src/**/*.css"],
  plugins: [require("@tailwindcss/forms")],
  theme: {
    extend: {
      gridAutoRows: {
        "1fr": "minmax(100px, auto)",
      },
    },
  },
};
