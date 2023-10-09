import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      boxShadow: {
        "center-md":
          "0 1px 15px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(16 24 40 / 0.1)",
        "center-lg":
          "0 1px 25px -1px rgb(0 0 0 / 0.1), 0 2px 0px -2px rgb(16 24 40 / 0.1)",
      },
    },
    colors: {
      primary: "#a52019",
      secondary: "#e0efef",
      transparent: "transparent",
      "secondary-rgba": "#bef6f2c2",
      "white-rgba": "#ffffffc2",
      white: "#fff",
      black: "#000",
    },
  },
  plugins: [],
};
export default config;
