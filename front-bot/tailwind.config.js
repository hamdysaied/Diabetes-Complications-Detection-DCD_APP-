/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    fontFamily: {
      roboto: ["Roboto Flex", "sans-serif"],
      lora: ["Lora", "serif"],
    },
    backgroundImage: {
      landingBackground: "url('/src/assets/background.png')",
      loginBackground: "url('/src/assets/loginBackground.png')",
    },
    boxShadow: {
      "3xl": "-10px 15px 13px 5px rgba(0, 0, 0, 0.35)",
    },
  },
  plugins: [],
};
