/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        sm: "790px",
        md: "964px",
        lg: "1440px",
      },
    },
  },
  plugins: [],
};
