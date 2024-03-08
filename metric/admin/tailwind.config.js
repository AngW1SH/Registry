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
      },
      boxShadow: {
        "center-md":
          "0 1px 15px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(16 24 40 / 0.1)",
        "center-lg":
          "0 1px 25px -1px rgb(0 0 0 / 0.1), 0 2px 0px -2px rgb(16 24 40 / 0.1)",
        "center-xl": "0 0 10px #85888C",
      },
    },
  },
  plugins: [],
}

