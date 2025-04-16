// tailwind.config.js
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        opensans: ['"Open Sans"', ...defaultTheme.fontFamily.sans],
        poppins: ['Poppins', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
