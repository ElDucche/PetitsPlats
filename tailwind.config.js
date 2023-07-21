/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}",
    "./**/*.{html,js}"
  ],
  theme: {
    colors: {
      yellow: "#FFD15B",
      black: "#1B1B1B",
      grey: "#7a7a7a",
      lightgrey: "#EDEDED",
      white: "#FFFFFF",
    },
    extend: {
      backgroundImage: {
        'hero-pattern': "url('../src/img/heroImage.png')",
      }

    },
  },
  plugins: [],
}