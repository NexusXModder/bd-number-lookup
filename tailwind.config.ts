import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: { extend: {
    fontFamily: { sans: ["var(--font-inter)", "ui-sans-serif", "system-ui"] },
    boxShadow: { glow: "0 0 70px rgba(99,102,241,.16)" }
  }},
  plugins: []
};
export default config;