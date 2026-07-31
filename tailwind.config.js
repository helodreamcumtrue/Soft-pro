/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // App.jsx handles the injection, but this maps the utility class
        sans: ['Poppins', 'sans-serif'], 
      }
    },
  },
  plugins: [],
};
