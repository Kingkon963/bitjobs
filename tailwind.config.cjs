/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "node_modules/daisyui/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      "corporate",
      // "business",
      {
        mytheme: {
          primary: "#bc861a",

          secondary: "#22d3ee",

          accent: "#d33bd3",

          neutral: "#1D1726",

          "base-100": "#283C4D",

          info: "#546ED9",

          success: "#22c55e",

          warning: "#F0B60A",

          error: "#DE2B46",
        },
      },
    ],
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
};
