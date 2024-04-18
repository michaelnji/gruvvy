/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui'
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        head: ['Pally', 'sans-serif'],
        sans: ['Manrope', 'sans-serif']
      }
    }
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        light: {
          'base-content': 'rgb(47, 2, 7)',
          primary: 'rgb(199, 129, 19)',
          'primary-content': 'rgb(255, 237, 213)',
          secondary: 'rgb(67, 2, 7)',
          success: '#087f5b',
          'success-content': '#c3fae8',
          error: '#c2255c',
          'error-content': '#ffe3e3',
          neutral: '#3d4451',
          'base-100': '#fff4e6',
          'base-200': '#ffe8cc',
          'base-300': '#ffd8a8',

          '--rounded-box': '1rem', // border radius rounded-box utility class, used in card and other large boxes
          '--rounded-btn': '0.5rem', // border radius rounded-btn utility class, used in buttons and similar element
          '--rounded-badge': '1.9rem', // border radius rounded-badge utility class, used in badges and similar
          '--animation-btn': '0.25s', // duration of animation when you click on button
          '--animation-input': '0.2s', // duration of animation for inputs like checkbox, toggle, radio, etc
          '--btn-focus-scale': '0.95', // scale transform of button when you focus on it
          '--border-btn': '1px', // border width of buttons
          '--tab-border': '1px', // border width of tabs
          '--tab-radius': '0.5rem' // border radius of tabs
        }
      }
    ]
  }
}

