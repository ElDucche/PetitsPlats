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
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        smooth: {
          '0%' : {
            transform: 'translateY(-3rem)',
            opacity: '0',
          },
          '100%' : {
            transform: 'translateY(0)',
            opacity: '1',
          }
        },
      }
    },
  },
  plugins: [],
}