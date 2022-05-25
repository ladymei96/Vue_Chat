module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "main-color": "#4A90E2",
      },
      boxShadow: {
        "r-sm": "2px 0px 8px 0px rgba(0, 0, 0, 0.2)",
      },
      spacing: {
        "90%": "90%",
      },
    },
  },
  plugins: [],
};
