/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#0b0b0b',
          elevated: '#121212',
          higher: '#1a1a1a',
          surface: '#222222',
        },
        paper: {
          DEFAULT: '#f4f2ee',
          dim: '#eae7e1',
        },
        brand: {
          red: '#ED1B2E',
          blue: '#0077B2',
          gold: '#C5A059',
        },
        textDim: '#b9b6b1',
        textFaint: '#7c7a76',
      },
      fontFamily: {
        display: ['Oswald', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
