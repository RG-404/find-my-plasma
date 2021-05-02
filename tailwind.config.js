module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    minHeight: {
      0: "0",
      48: "48rem",
      full: "100%",
    },
    extend: {
      width: {
        "palsma-table": "60rem",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
