/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary: "#24138b",
        dark: "#303030",
      },
      fontSize: {
        sm: ["0.875rem", "1"],
      },

      fontFamily: {
        sans: ["Questrial", "system-ui"],
      },
    },
    screens: {
      xs: "400px",
      "3xl": "2000px",
      ...defaultTheme.screens,
    },
    container: {
      center: true,
      padding: ".625rem",
    },
  },
  plugins: [],
  corePlugins: {
    container: false,
  },
};
