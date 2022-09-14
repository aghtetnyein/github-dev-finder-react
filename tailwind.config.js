/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primaryLight: "#E1FAF9",
        secondaryLight: "#A4DBF0",
        primaryDark: "#00171F",
        secondaryDark: "#012742",
        blue: "#07A0C3",
        red: "#D65780",
      },
    },
  },
  plugins: [],
};
