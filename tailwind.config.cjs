/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./@/components/**/*.{js,ts,jsx,tsx}",
    "node_modules/daisyui/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  daisyui: {
    themes: [
      "light",
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
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
    require("daisyui"),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    require("tailwindcss-animate")
  ],
};
