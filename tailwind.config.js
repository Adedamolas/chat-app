/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Satoshi", "sans-serif"],
    },
    extend: {
      backgroundImage: {
        "hero-pattern": "url('/hero.svg')",
      },
    },
  },
  plugins: [],
};

