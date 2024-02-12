import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        openDescriptionAnimation: {
          '0% ': { maxHeight: '120px' },
          '100%': { maxHeight: '2000px' },
        }
      },
      
      backgroundColor: {
        violet1: "#EDE9FE",
        violet2: "#DDD6FE",
        grayCastom: "#F1F5F9",
        grayCastom2: "#E2E8F0",
      },

      borderColor: {
        violet1: "#EDE9FE",
        violet2: "#DDD6FE",
        grayCastom: "#F1F5F9",
        grayCastom2: "#E2E8F0",
      },

      screens: {
        small: "300px",
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
