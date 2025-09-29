import type { Config } from "tailwindcss";
import forms from "@tailwindcss/forms";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx,js,jsx,mdx}",
    "./src/components/**/*.{ts,tsx,js,jsx,mdx}",
    "./src/pages/**/*.{ts,tsx,js,jsx,mdx}",
    "./src/**/*.{ts,tsx,js,jsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#2563eb",
          50: "#eef6ff",
          100: "#dbeafe",
          200: "#93c5fd",
          400: "#3b82f6",
          dark: "#1e40af",
          light: "#60a5fa",
        },
        secondary: {
          DEFAULT: "#f59e0b",
          50: "#fff7ed",
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
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui"],
        display: ["var(--font-display)", "sans-serif"],
      },

      fontSize: {
        "heading-xl": ["2.5rem", { lineHeight: "1.15", fontWeight: "700" }],
        "heading-lg": ["2rem", { lineHeight: "1.2", fontWeight: "700" }],
        "heading-md": ["1.5rem", { lineHeight: "1.35", fontWeight: "600" }],
        "body-lg": ["1.125rem", { lineHeight: "1.6" }],
        "body-base": ["1rem", { lineHeight: "1.6" }],
        "body-sm": ["0.875rem", { lineHeight: "1.5" }],
      },

      boxShadow: {
        card: "0 6px 24px rgba(16, 24, 40, 0.06)",
        overlay: "0 8px 30px rgba(2,6,23,0.12)",
      },

      borderRadius: {
        lg: "0.75rem",
        xl: "1rem",
        "2xl": "1.5rem",
      },
    },
  },
  plugins: [forms, typography],
};

export default config;
