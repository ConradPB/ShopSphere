// tailwind.config.cjs
/** @type {import('tailwindcss').Config} */
module.exports = {
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
          dark: "#1e40af",
          light: "#60a5fa",
        },
        secondary: {
          DEFAULT: "#f59e0b",
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
        // use CSS vars so Next font loading / google fonts can be swapped easily
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui"],
        display: ["var(--font-display)", "sans-serif"],
      },
      fontSize: {
        "heading-xl": ["2.5rem", { lineHeight: "1.2", fontWeight: "700" }],
        "heading-lg": ["2rem", { lineHeight: "1.3", fontWeight: "700" }],
        "heading-md": ["1.5rem", { lineHeight: "1.4", fontWeight: "600" }],
        "body-lg": ["1.125rem", { lineHeight: "1.6", fontWeight: "400" }],
        "body-base": ["1rem", { lineHeight: "1.6", fontWeight: "400" }],
        "body-sm": ["0.875rem", { lineHeight: "1.5", fontWeight: "400" }],
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
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};
