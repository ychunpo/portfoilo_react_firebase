//const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    fontFamily: {
      //sans: ['Graphik', 'sans-serif'],
      //serif: ['Merriweather', 'serif'],
    },
    extend: {},
  },
  plugins: [],
}