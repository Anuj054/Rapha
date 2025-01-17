// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Include all your source files here
  ],
  theme: {
    screens: {
      xs: "380px",
      sm: "640px",

      md: "768px",

      lg: "1024px",

      xl: "1280px",

      "2xl": "1536px",
    },
    extend: {
      colors: {
        customBrown: "#6f5c47", // Define the custom color
      },
    },
  },
  plugins: [],
};
