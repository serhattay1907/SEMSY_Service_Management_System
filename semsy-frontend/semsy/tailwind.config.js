/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Layered dark backgrounds
        ink: {
          950: "#0a0a0f",
          900: "#12121a",
          800: "#1a1a26",
          700: "#252533",
        },
        // Warm amber accent
        amber: {
          DEFAULT: "#f59e0b",
          glow: "#fbbf24",
          deep: "#d97706",
        },
        // Status accents
        teal: {
          accent: "#2dd4bf",
        },
        rose: {
          accent: "#fb7185",
        },
        // Glass border / surface
        glass: {
          border: "rgba(255, 255, 255, 0.08)",
          "border-strong": "rgba(255, 255, 255, 0.14)",
          surface: "rgba(255, 255, 255, 0.04)",
          "surface-strong": "rgba(255, 255, 255, 0.07)",
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', "Inter", "system-ui", "sans-serif"],
      },
      backdropBlur: {
        glass: "16px",
        "glass-strong": "24px",
      },
      boxShadow: {
        "glass-inner":
          "inset 0 1px 0 0 rgba(255, 255, 255, 0.06), inset 0 0 0 1px rgba(255, 255, 255, 0.04)",
        "amber-glow": "0 0 40px -10px rgba(245, 158, 11, 0.45)",
        "amber-glow-strong":
          "0 0 50px -8px rgba(245, 158, 11, 0.6), 0 8px 32px -8px rgba(217, 119, 6, 0.4)",
      },
      keyframes: {
        "fade-slide-up": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-slide-down": {
          "0%": { opacity: "0", transform: "translateY(-8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scale-fade-in": {
          "0%": { opacity: "0", transform: "scale(0.94)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "micro-bounce": {
          "0%": { transform: "scale(1)" },
          "40%": { transform: "scale(1.18)" },
          "100%": { transform: "scale(1)" },
        },
        "sheet-up": {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        "fade-slide-up": "fade-slide-up 280ms cubic-bezier(0.16, 1, 0.3, 1)",
        "fade-slide-down":
          "fade-slide-down 260ms cubic-bezier(0.16, 1, 0.3, 1)",
        "scale-fade-in": "scale-fade-in 220ms cubic-bezier(0.16, 1, 0.3, 1)",
        "micro-bounce": "micro-bounce 320ms cubic-bezier(0.34, 1.56, 0.64, 1)",
        "sheet-up": "sheet-up 320ms cubic-bezier(0.16, 1, 0.3, 1)",
        shimmer: "shimmer 2.4s linear infinite",
        "pulse-soft": "pulse-soft 2s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
