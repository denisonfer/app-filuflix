/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        black: {
          900: '#000000',
        },
        white: {
          900: '#ffffff',
        },
      },
    },
  },
  plugins: [],
};
