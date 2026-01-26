import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        greenery: {
          100: "#F8FAEC",
          200: "#EDF2CF",
          300: "#DFE7A7",
          400: "#D0DC7F",
          500: "#BFD051", // main
          600: "#BCCF3C",
          700: "#5F691E",
          800: "#2D3305",
          900: "#171B02",
        },
        blue: {
          100: "#E7ECFC",
          200: "#C3D0F8",
          300: "#8CA5F2",
          400: "#5177EB",
          500: "#1A4CE5", // main
          600: "#1339AB",
          700: "#0D2673",
          800: "#061338",
          900: "#030A20",
        },
        grey: {
          100: "#FAFBFC",
          200: "#F3F4F7",
          300: "#D7DAE5",
          400: "#BEC4D5",
          500: "#A3ABC3", // main
          600: "#797F91",
          700: "#4F535E",
          800: "#24262B",
          900: "#0E0F11",
        },
        tangerine: {
          100: "#FDF0EC",
          200: "#FBDBD0",
          300: "#F6AF98",
          400: "#F18360",
          500: "#EC5929", // main
          600: "#B2431F",
          700: "#752C14",
          800: "#3B160A",
          900: "#1E0B05",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
