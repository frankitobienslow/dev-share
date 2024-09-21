/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ "./App.{js,jsx,ts,tsx}", // Captura App.js
    "./app/**/*.{js,jsx,ts,tsx}", // Captura todos los archivos en la carpeta app
    "./components/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {},
  },
  plugins: [],
}

