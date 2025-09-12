import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx,js,jsx,mdx}",
    "./src/components/**/*.{ts,tsx,js,jsx,mdx}",
    "./src/pages/**/*.{ts,tsx,js,jsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#2563eb", // modern blue
          dark: "#1e40af",
          light: "#60a5fa",
        },
        secondary: {
          DEFAULT: "#f59e0b", // warm amber
          dark: "#b45309",
          light: "#fbbf24",
        },
        neutral: {
          50: "#f9fafb",
          100: "#f3f4f6",
          200: "#e5e7eb",
          300: "#d1d5db",
          400: "#9ca3af",
          500: "#6b7280",
          600: "#4b5563",
          700: "#374151",
          800: "#1f2937",
          900: "#111827",
        },
        accent: {
          green: "#10b981",
          red: "#ef4444",
          purple: "#8b5cf6",
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
      transitionTimingFunction: {
        "in-expo": "cubic-bezier(0.95, 0.05, 0.795, 0.035)",
        "out-expo": "cubic-bezier(0.19, 1, 0.22, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
