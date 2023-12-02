/** @type {import('tailwindcss').Config} */
import typography from "@tailwindcss/typography";

module.exports = {
  darkMode: ["class"],
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
      padding: {
        DEFAULT: "0",
        md: "2em",
        xl: "10em",
      },
    },
    fontSize: {
      /* [font-size, line-height] */
      "3xs": ["0.75rem", "1.6"] /* 12px */,
      "2xs": ["0.875rem", "1.6"] /* 14px */,
      xs: ["1rem", "1.8"] /* 16px */,
      sm: ["1.125rem", "1.8"] /* 18px */,
      base: ["1.25rem", "1.8"] /* 20px */,
      lg: ["1.375rem", "1.4"] /* 22px */,
      xl: ["1.5rem", "1.4"] /* 24px */,
      "2xl": ["1.625rem", "1"] /* 26px */,
      "3xl": ["1.75rem", "1.4"] /* 28px */,
      "4xl": ["1.875rem", "1"] /* 30px */,
      "5xl": ["2.125rem", "1"] /* 34px */,
      "6xl": ["2.25rem", ""] /* 36px */,
      "7xl": ["2.5rem", "1"] /* 40px */,
      "8xl": ["3rem", "1"] /* 48px */,
      "9xl": ["3.75rem", "1"] /* 60px */,
      "10xl": ["5rem", "0.8"] /* 80px */,
      "11xl": ["6.25rem", "1.1"] /* 100px */,
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
        neutral: "#F7F4F3",
        "dark-grey": "#7C8D85",
        "light-grey": "BEC6C2",
        "dark-green": "#262C29",
        "green-shadow": "#A8CF4399",
        "dark-shadow": "#7C8D8599",
        "light-shadow": "#D9D9D9",
      },
      boxShadow: {
        "hover-btn": "0px 10px 20px 0px rgba(8, 7, 8, 0.25)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [require("tailwindcss-animate"), typography],
};
