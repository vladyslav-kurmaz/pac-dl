import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        violet1: "#EDE9FE",
        violet2: "#DDD6FE",
        grayCastom: '#F1F5F9',
      },

      borderColor: {
        violet1: "#EDE9FE",
        violet2: "#DDD6FE",
        grayCastom: '#F1F5F9',
      },

      screens: {
        sm: "375px",
        md: "768px",
        base: "1000px",
        lg: "1140px",
        xl: "1920px",
      },
      maxWidth: {
        sm: "375px",
        md: "768px",
        lg: "1140px",
        xl: "1920px",
      },
    },
  },
  plugins: [],
};
export default config;
