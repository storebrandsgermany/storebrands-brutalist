/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Satoshi', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        brand: {
          dark: '#030303',
          card: '#0a0a0a',
          lime: '#bbf7d0',
          limestrong: '#4ade80',
          limenon: '#22c55e',
          text: '#ffffff',
          muted: '#888888'
        }
      }
    },
  },
  plugins: [],
}