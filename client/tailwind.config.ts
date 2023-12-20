import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/screens/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        background: "#E8E9EE",
        container: "#F8F8F8",
      },
      fontSize: {
        md: "1.1rem",
        xxs: "0.5rem",
      },
      aspectRatio: {
        "video-wide": "16/10",
      },
      keyframes: {
        "bg-scroll-kf": {
          "0%": { backgroundPosition: "0% 0%" },
          "100%": { backgroundPosition: "100% 0%" },
        },
        "video-bg-animation": {
          "0%": { scale: "1", filter: "brightness(1)", rotate: "0deg" },
          "25%": { scale: "1.04", filter: "brightness(2)", rotate: "3deg" },
          "50%": { scale: "0.95", filter: "brightness(1)", rotate: "0deg" },
          "75%": { scale: "1.04", filter: "brightness(2)", rotate: "-3deg" },
          "100%": { scale: "1", filter: "brightness(1)", rotate: "0deg" },
        },
      },
      animation: {
        "bg-scroll": "bg-scroll-kf 8s linear alternate infinite",
        "video-bg-animation": "video-bg-animation 5s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
