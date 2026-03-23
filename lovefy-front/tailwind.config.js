/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        spotify: {
          base: '#121212',
          sidebar: '#000000',
          card: '#181818',
          hover: '#282828',
          text: '#B3B3B3',
          green: '#1DB954',
        },
      },
    },
  },
  plugins: [],
}