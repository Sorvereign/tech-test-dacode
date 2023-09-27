import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-primary":
          "linear-gradient(to right, #3AE3C39C 60%, #4E6CE4D7 84%, #563FF0 100%)",
      },
      colors: {
        purple: {
          brand: "#5141EA",
          background: "#03067B",
        },
      },
    },
  },
  plugins: [require("daisyui"), require('@tailwindcss/line-clamp'),],
  daisyui: {
    themes: [
      {
        daCodes: {
          primary: "#5141EA",
          secondary: "#f000b8",
          accent: "#1dcdbc",
          neutral: "#2b3440",
          "base-100": "#ffffff",
          info: "#3abff8",
          success: "#36d399",
          warning: "#fbbd23",
          error: "#f87272",
        },
      },
    ],
  },
};
export default config;
