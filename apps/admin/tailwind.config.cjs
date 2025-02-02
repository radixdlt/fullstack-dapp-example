const defaultTheme = require('tailwindcss/defaultTheme')

const config = {
  content: [
    './src/**/*.{html,js,svelte,ts,md}',
    '../../node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'
  ],

  plugins: [require('flowbite/plugin')({})],
  darkMode: 'class',
  theme: {
    fontFamily: {
      sans: ['Inter', ...defaultTheme.fontFamily.sans]
    },
    extend: {
      colors: {
        // sky
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e'
        }
      }
    }
  }
}

module.exports = config
