// tailwind.config.js
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}', // Include all your source files here
  ],
  theme: {
    extend: {
      colors: {
        customBrown: '#6f5c47', // Define the custom color
      },
    },
  },
  plugins: [],
};
