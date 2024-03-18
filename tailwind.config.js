/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui'
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily:{
        head:['Excon','sans-serif'],
        sans:['Ranade','sans-serif'],
      }
    }
  },
  plugins: [daisyui]
}

