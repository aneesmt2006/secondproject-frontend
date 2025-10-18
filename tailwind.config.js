/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        periwinkle: '#7A77B9',
        lavender: '#A58DB1',
        cocoa: '#5A3C33',
        wine: '#7B2E2F',
        rose: '#D4798B',
        lilac: '#C7A7D1',
        cream: '#F9F0E6',
      },
      fontFamily: {
        'tan-mon-cheri': ['"Tan Mon Cheri"', 'serif'],
        sans: ['"Tan Mon Cheri"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
