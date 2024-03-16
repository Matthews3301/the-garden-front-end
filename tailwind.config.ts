import colors from 'tailwindcss/colors'

export default {
  content: [
    './**/*.vue',
    './src/**/*.vue'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#076655',
        secondary: colors.slate[700],
        'green-light': '#c6d7ca',
        'green-dark': '#446562',
      }
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ['light'],
    base: false,
    styled: false,
    utils: false,
    prefix: "",
    logs: false,
  },

}

