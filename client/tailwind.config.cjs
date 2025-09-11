import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}", // catch-all for anything else under src
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#2563eb",
          dark: "#1e40af",
          light: "#60a5fa",
        },
        secondary: {
          DEFAULT: "#f59e0b",
        },
        neutral: {
          /* your existing palette */
        },
        accent: {
          /* your existing accent colors */
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
        display: ["Poppins", "ui-sans-serif", "system-ui"],
      },
      boxShadow: {
        card: "0 4px 14px rgba(0, 0, 0, 0.08)",
        smooth: "0 2px 6px rgba(0, 0, 0, 0.06)",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
      },
    },
  },
  plugins: [],
};

export default config;
