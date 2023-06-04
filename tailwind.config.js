/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors')
const plugin = require('tailwindcss/plugin')

module.exports = {
  content: [
    // Example content paths...
    './public/**/*.html',
    './src/**/*.{js,jsx,ts,tsx,vue}',
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: '1.5rem',
          sm: '2rem',
          lg: '3rem',
          xl: '6rem',
          '2xl': '8rem',
        }
      },
      colors: {
        main: "#3F497F",
        secondary: "#0081B4",
        tertiary: "#343434",
        redme: "#f20000",
        add: "#2faeb4"
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    plugin(function ({ addBase }) {
      addBase({
        'h1, .h1': {
          fontSize: "calc(38px + (72 - 38) * ((100vw - 300px) / (2300 - 300)))",
          lineHeight: 1
        },
        'h2, .h2': {
          fontSize: "calc(30px + (56 - 30) * ((100vw - 300px) / (2300 - 300)))",
          lineHeight: 1,
        },
        'h3, .h3': {
          fontSize: "calc(18px + (36 - 18) * ((100vw - 300px) / (2300 - 300)))",
          lineHeight: 1.2,
        },
        'h4, .h4': {
          fontSize: "calc(16px + (18 - 16) * ((100vw - 300px) / (2300 - 300)))",
          lineHeight: 1,
        },
        'h5, .h5': {
          fontSize: "calc(9px + (16- 9) * ((100vw - 300px) / (2300 - 300)))",
          lineHeight: 1.5
        },
        '.font-btn': {
          fontSize: "calc(15px + (16 - 15) * ((100vw - 300px) / (2300 - 300)))",
          lineHeight: 1.2,
          fontWeight: '500'
        },
        'p, .p': {
          fontSize: "calc(14px + (16 - 14) * ((100vw - 300px) / (2300 - 300)))",
          lineHeight: 1.2
        },
        '.p-small': {
          fontSize: "calc(12px + (14 - 12) * ((100vw - 300px) / (2300 - 300)))",
          lineHeight: 1.2
        },
      })
    })
  ],
}