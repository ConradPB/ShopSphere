/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // optional: enable class-based dark mode
  content: [
    "./src/app/**/*.{ts,tsx,js,jsx}",
    "./src/pages/**/*.{ts,tsx,js,jsx}",
    "./src/components/**/*.{ts,tsx,js,jsx}",
    "./src/**/*.{html,ts,tsx,js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        // primary token used in your code (bg-primary). Adjust hexes to taste.
        primary: {
          DEFAULT: "#0ea5e9", // primary base
          50:  "#ecfeff",
          100: "#cffafe",
          200: "#a5f3fc",
          300: "#67e8f9",
          400: "#22d3ee",
          500: "#06b6d4",
          600: "#0891b2",
          700: "#0e7490",
          800: "#155e75",
          900: "#164e63"
        }
      },
      fontFamily: {
        // font-display referenced in your page; add a webfont or use system fallbacks
        display: ["Inter", "ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "Helvetica", "Arial", "sans-serif"],
        sans: ["ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "Helvetica", "Arial", "sans-serif"]
      }
    },
  },
  plugins: [
    // uncomment if you use these official plugins
    // require('@tailwindcss/forms'),
    // require('@tailwindcss/typography'),
    // require('@tailwindcss/aspect-ratio'),
  ],
};
