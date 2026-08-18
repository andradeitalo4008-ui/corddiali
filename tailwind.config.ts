import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#080808",
        graphite: "#111111",
        ivory: "#F1ECE7",
        copper: "#B66D45",
        copperSoft: "#D19A79",
        stone: "#A29A94"
      },
      fontFamily: {
        sans: ["Arial", "Helvetica", "sans-serif"],
        serif: ["Georgia", "Times New Roman", "serif"]
      }
    }
  },
  plugins: []
};
export default config;
