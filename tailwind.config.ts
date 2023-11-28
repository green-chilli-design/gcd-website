import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

export default {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    screens: {
      xs: "320px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1920px",
    },
    container: {
      center: true,
      padding: "1.25rem",
    },
    fontSize: {
      tiny: "0.75rem" /* 12px */,
      xs: "0.875rem" /* 14px */,
      sm: "1.125rem" /* 18px */,
      base: "1.25rem" /* 20px */,
      lg: "1.5rem" /* 24px */,
      xl: "1.875rem" /* 30px */,
      "2xl": "2.5rem" /* 40px */,
      "3xl": "5rem" /* 80px */,
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        sans: ["var(--font-jost)"],
      },
      colors: {
        black: "#080708",
        green: "#A8CF43",
        neutral: "#F5F5F5",
        "dark-grey": "#7C8D85",
        "light-grey": "BEC6C2",
        "dark-green": "#262C29",
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [typography],
} satisfies Config;
