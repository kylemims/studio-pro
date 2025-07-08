/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Custom color palette for boutique fitness studio
        'studio-dark': '#041421',
        'studio-blue': '#042630',
        'studio-teal': '#4c7273',
        'studio-mint': '#86b9b0',
        'studio-light': '#d0d6d6'
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
