/** @type {import('tailwindcss').Config} */
module.exports = {
  // Include all files that may contain Tailwind/NativeWind classes.
  // Expo Router projects typically use the `app/` directory, so include it.
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './App.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './screens/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {},
  },
  plugins: [],
};
