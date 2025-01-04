/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}", // Include your source files
    "./public/index.html", // Include public files if needed
  ],
  theme: {
    extend: {
      fontFamily: {
        Manrope: ["Manrope", "serif"], // Define your custom font family
        Tiny5: ["Tiny5", "serif"],
      },
      colors: {
        tradeWhite: "#eeeef1",
        tradeBlack: "#111116",
        tradeAsh: "#1a191e",
        tradeGreen: "#00de82",
        tradePurple: "#9e62ff",
        tradeOrange: "#ffcb4d",
      },
    },
  },
  plugins: [],
};
