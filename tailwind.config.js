/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: '#4EA685',
        secondary: '#57B894',
      },
      scale: {
        '0': '0',
        '100': '1',
      },
      transitionDelay: {
        '1000': '1000ms',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

