/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  safelist: [
    "bg-red-500",
    "bg-green-500",
    "bg-blue-500",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

