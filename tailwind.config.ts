import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx,js,jsx,astro}",
  ],
  theme: {
    extend: {
      colors: {
        // Your existing color configuration
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
  // Updated safelist to include all color families used in case studies
  safelist: [
    {
      pattern: /^(bg|text|border|from|to)-(violet|purple|amber|neutral|gray|blue|sky|indigo|green|red|orange|yellow)-([1-9]00|950)/,
    }
  ]
}

export default config