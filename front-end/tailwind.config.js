/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
    },
    colors: {
      ...colors,
      'primary-1': '#5D3277',
      'primary-2': '#A16DB7',
      'primary-3': '#CCB4C3',
      'primary-4': '#F8F9F4',
      'primary-5': '#F9EDC2',
    },
  },
  plugins: [],
};
