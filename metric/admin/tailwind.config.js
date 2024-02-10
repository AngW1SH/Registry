/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#FCFCFCB2",
        primary: "#551FFF",
        secondary: "#F3F0FF"
      }
    },
  },
  plugins: [],
}

