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
        desert: {
          'base-content': '#302118',
          primary: '#977944',
          'primary-content': '#dbd3ad',
          secondary: '#302118',
          success: '#0c8932',
          'success-content': '#ecfdf5',
          error: '#c91340',
          'error-content': '#ffe4e6',
          neutral: '#3d4451',
          'base-100': '#f7f7ef',
          'base-200': '#ece9d5',
          'base-300': '#dbd3ad',

          '--rounded-box': '1rem', // border radius rounded-box utility class, used in card and other large boxes
          '--rounded-btn': '0.5rem', // border radius rounded-btn utility class, used in buttons and similar element
          '--rounded-badge': '1.9rem', // border radius rounded-badge utility class, used in badges and similar
          '--animation-btn': '0.25s', // duration of animation when you click on button
          '--animation-input': '0.2s', // duration of animation for inputs like checkbox, toggle, radio, etc
          '--btn-focus-scale': '0.95', // scale transform of button when you focus on it
          '--border-btn': '1px', // border width of buttons
          '--tab-border': '1px', // border width of tabs
          '--tab-radius': '0.5rem' // border radius of tabs
        },
        amethyst: {
          'base-content': '#220029',
          primary: '#bd5adb',
          'primary-content': '#fefefe',
          secondary: '#220029',
          success: '#0c8932',
          'success-content': '#ecfdf5',
          error: '#c91340',
          'error-content': '#ffe4e6',
          neutral: '#3d4451',
          'base-100': '#fefefe',
          'base-300': '#f8e7ff',
          'base-200': '#fcf3f3',

          '--rounded-box': '1rem', // border radius rounded-box utility class, used in card and other large boxes
          '--rounded-btn': '0.5rem', // border radius rounded-btn utility class, used in buttons and similar element
          '--rounded-badge': '1.9rem', // border radius rounded-badge utility class, used in badges and similar
          '--animation-btn': '0.25s', // duration of animation when you click on button
          '--animation-input': '0.2s', // duration of animation for inputs like checkbox, toggle, radio, etc
          '--btn-focus-scale': '0.95', // scale transform of button when you focus on it
          '--border-btn': '1px', // border width of buttons
          '--tab-border': '1px', // border width of tabs
          '--tab-radius': '0.5rem' // border radius of tabs
        },
        forest: {
          'base-content': '#122a09',
          primary: '#52a923',
          'primary-content': '#e0f7d0',
          secondary: '#122a09',
          success: '#0c8932',
          'success-content': '#ecfdf5',
          error: '#c91340',
          'error-content': '#ffe4e6',
          neutral: '#3d4451',
          'base-100': '#fefefe',
          'base-300': '#e0f7d0',
          'base-200': '#f1fce9',

          '--rounded-box': '1rem', // border radius rounded-box utility class, used in card and other large boxes
          '--rounded-btn': '0.5rem', // border radius rounded-btn utility class, used in buttons and similar element
          '--rounded-badge': '1.9rem', // border radius rounded-badge utility class, used in badges and similar
          '--animation-btn': '0.25s', // duration of animation when you click on button
          '--animation-input': '0.2s', // duration of animation for inputs like checkbox, toggle, radio, etc
          '--btn-focus-scale': '0.95', // scale transform of button when you focus on it
          '--border-btn': '1px', // border width of buttons
          '--tab-border': '1px', // border width of tabs
          '--tab-radius': '0.5rem' // border radius of tabs
        },
        white: {
          'base-content': '#000',
          primary: '#000',
          'primary-content': '#feffff',
          secondary: '#000',
          success: '#0c8932',
          'success-content': '#ecfdf5',
          error: '#c91340',
          'error-content': '#ffe4e6',
          neutral: '#3d4451',
          'base-100': '#fff',
          'base-200': '#f1f3f5',
          'base-300': '#ddd',

          '--rounded-box': '1rem', // border radius rounded-box utility class, used in card and other large boxes
          '--rounded-btn': '0.5rem', // border radius rounded-btn utility class, used in buttons and similar element
          '--rounded-badge': '1.9rem', // border radius rounded-badge utility class, used in badges and similar
          '--animation-btn': '0.25s', // duration of animation when you click on button
          '--animation-input': '0.2s', // duration of animation for inputs like checkbox, toggle, radio, etc
          '--btn-focus-scale': '0.95', // scale transform of button when you focus on it
          '--border-btn': '1px', // border width of buttons
          '--tab-border': '1px', // border width of tabs
          '--tab-radius': '0.5rem' // border radius of tabs
        },
        midnight: {
          'base-content': '#fff',
          primary: '#888',
          'primary-content': '#fff',
          secondary: '#fff',
          success: '#0c8932',
          'success-content': '#ecfdf5',
          error: '#c91340',
          'error-content': '#ffe4e6',
          neutral: '#3d4451',
          'base-100': '#000000',
          'base-200': '#111',
          'base-300': '#222',

          '--rounded-box': '1rem', // border radius rounded-box utility class, used in card and other large boxes
          '--rounded-btn': '0.5rem', // border radius rounded-btn utility class, used in buttons and similar element
          '--rounded-badge': '1.9rem', // border radius rounded-badge utility class, used in badges and similar
          '--animation-btn': '0.25s', // duration of animation when you click on button
          '--animation-input': '0.2s', // duration of animation for inputs like checkbox, toggle, radio, etc
          '--btn-focus-scale': '0.95', // scale transform of button when you focus on it
          '--border-btn': '1px', // border width of buttons
          '--tab-border': '1px', // border width of tabs
          '--tab-radius': '0.5rem' // border radius of tabs
        },
        nord: {
          'base-content': '#f2f9f9',
          primary: '#95c2cb',
          'primary-content': '#3d6d7d',
          secondary: '#f2f9f9',
          success: '#0c8932',
          'success-content': '#ecfdf5',
          error: '#c91340',
          'error-content': '#ffe4e6',
          neutral: '#3d4451',
          'base-100': '#1b2a31',
          'base-200': '#2b3d46',
          'base-300': '#334c57',

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

