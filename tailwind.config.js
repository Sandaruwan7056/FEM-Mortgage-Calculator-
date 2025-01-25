/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      Lime: '#d7da2e',
      Lime2:'#dee06c',
      Lime3:'#feffc2',
      Red: '#d73327',
      Neutral: {
        White: '#ffffff',
        100: '#e2f3fc',
        300: '#9abed4',
        500: '#6b93a8',
        700: '#4d6e7e',
        900: '#122e3f',
        1000:'#091c25',
      },
    },
    extend: {
      borderRadius: {
        '4xl': '2rem', // Example: Larger than 3xl
        '5xl': '2.5rem', // Even larger
        '6xl': '3rem', // Customize as needed
      },
    },
  },
  plugins: [],
}