/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{html,js,jsx,ts,tsx}", // Include your source files
  ],
  theme: {
    extend: {
      fontFamily: {
        Manrope: ["Manrope", "serif"],
        Tiny5: ["Tiny5", "serif"],
      },
      colors: {
        tradeWhite: "#eeeef1",
        tradeFadeWhite: "#AAAAAA",
        tradeBlack: "#111116",
        tradeAsh: "#121212",
        tradeAshLight: "#282828",
        tradeAshExtraLight: "#464646",
        tradeBorder: "#404040",
        tradeGreen: "#00de82",
        tradeLightGreen: "#f0fff9",
        tradePurple: "#9e62ff",
        tradeOrange: "#ffcb4d",
      },
      boxShadow: {
        tradeSpreadOut: "0 0 20px 2px rgba(34, 197, 94, -0.20)",
        tradeHoverInDefault: "inset 0 0 20px 2px rgba(255, 255, 255, 0.20)",
        tradeHoverIn: "inset 0 0 5px 2px rgba(255, 255, 255, 0.10)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        zoomShake: {
          "0%": { transform: "scale(1) rotate(0deg)" },
          "20%": { transform: "scale(1.3) rotate(5deg)" },
          "40%": { transform: "scale(1.3) rotate(-5deg)" },
          "60%": { transform: "scale(1.3) rotate(5deg)" },
          "80%": { transform: "scale(1.3) rotate(-5deg)" },
          "100%": { transform: "scale(1) rotate(0deg)" },
        },
      },
      animation: {
        zoomShake: "zoomShake 0.6s ease-in-out",
      },
    },
  },
  plugins: [], // No need to add PostCSS here
};
