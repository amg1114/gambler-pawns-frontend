import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      "dark-1":"#00161F",
      "dark-2":"#1C3A47",
      "primary":"#8ECAE6",
      "secondary":"#195571",
      "accent":"#FAB300",
      "error":"#FF0E0E",
      "success":"#3AFF13",
      "warning":"#FFFFFF",
      "light":"#EAE9FC",
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
