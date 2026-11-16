import type { Config } from "tailwindcss";

// Every colour comes from a CSS variable in src/styles/tokens.css (shadcn convention),
// so Lovable can reuse the same token names.
const token = (name: string) => `hsl(var(--${name}) / <alpha-value>)`;

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: token("background"),
        foreground: token("foreground"),
        surface: { DEFAULT: token("surface"), raised: token("surface-raised") },
        border: token("border"),
        muted: { DEFAULT: token("muted"), foreground: token("muted-foreground") },
        primary: { DEFAULT: token("primary"), foreground: token("primary-foreground") },
        info: token("info"),
        success: token("success"),
        danger: token("danger"),
        ring: token("ring"),
      },
      fontFamily: {
        display: ['"Bricolage Grotesque Variable"', "system-ui", "sans-serif"],
        sans: ['"Figtree Variable"', "system-ui", "sans-serif"],
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        DEFAULT: "var(--radius)",
        lg: "var(--radius-lg)",
      },
      boxShadow: {
        raised: "var(--shadow-raised)",
        press: "var(--shadow-press)",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
} satisfies Config;
