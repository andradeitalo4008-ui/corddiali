import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0A0A0A",
        graphite: "#111111",
        copper: "#B86E45",
        copperSoft: "#D09977",
        ivory: "#F3EEE8"
      },
      fontFamily: {
        sans: ["Arial", "Helvetica", "sans-serif"],
        serif: ["Georgia", "Times New Roman", "serif"]
      }
    }
  },
  plugins: [],
};
export default config;
