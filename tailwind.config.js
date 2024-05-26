/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}"],
  content: ["./src/**/*.{jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'primary': '#fdf8ee',
        'sec': '#72695f',
        'title': '#736560',
      },
    },
  },
  plugins: [],
}