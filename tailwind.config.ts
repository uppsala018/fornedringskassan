import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#f6f3ec",
        ink: "#1d2a2d",
        mist: "#d5d9d1",
        steel: "#617377",
        stamp: "#9e5440",
        ledger: "#cad2c5",
        fog: "#e8e5dd",
        seal: "#314346",
      },
      boxShadow: {
        docket: "0 20px 55px rgba(29, 42, 45, 0.12)",
        slip: "0 10px 28px rgba(29, 42, 45, 0.08)",
      },
      borderRadius: {
        dossier: "1.75rem",
      },
      fontFamily: {
        sans: ["Bahnschrift", "'Segoe UI'", "Tahoma", "Geneva", "Verdana", "sans-serif"],
        display: ["Georgia", "'Times New Roman'", "serif"],
        mono: ["'Courier New'", "monospace"],
      },
      backgroundImage: {
        grid: "linear-gradient(to right, rgba(97, 115, 119, 0.10) 1px, transparent 1px), linear-gradient(to bottom, rgba(97, 115, 119, 0.10) 1px, transparent 1px)",
        ledger:
          "linear-gradient(to right, rgba(97, 115, 119, 0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(97, 115, 119, 0.06) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};

export default config;
