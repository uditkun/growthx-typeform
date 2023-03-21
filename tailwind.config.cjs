/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      screens: {
        sm: "576px",
      },
      boxShadow: {
        input: "0px 1px 0px 0px rgba(255, 255, 255, 0.3)",
        inputFocus: "0px 2px 0px 0px rgb(255, 255, 255)",
        checkbox: "inset 0px 0px 0px 1px rgba(255, 255, 255, 0.6)",
        checkboxActive: "inset 0px 0px 0px 2px rgba(255, 255, 255, 0.8)",
      },
      colors: {
        growthXBlue: "rgb(0, 119, 255)",
        lightWhite: "rgba(255, 255, 255, 0.3)",
      },
    },
  },
  plugins: [],
};
