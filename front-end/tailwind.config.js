/** @type {import('tailwindcss').Config} */

const plugin = require('tailwindcss/plugin')

module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // forest-green
        primary: { 
          50: '#f2fbf3',
          100: '#e0f8e1',
          200: '#c3efc6',
          300: '#95e09c',
          400: '#5fc969',
          Default : '#39ae44',
          600: '#2a9134',
          700: '#24712c',
          800: '#215a28',
          900: '#1d4a23',
          950: '#0b280f',
        },
        // storm-gray
        secondary: {
          50: '#f7f8f8',
          100: '#eeeef0',
          200: '#d8dadf',
          300: '#b6b9c3',
          400: '#8f93a1',
          Default: '#696d7d',
          600: '#5b5f6e',
          700: '#4a4c5a',
          800: '#40424c',
          900: '#383942',
          950: '#25262c',
        }, 
        destructive: '#ff0035',
        accent: '#f68e5f',
        white : '#ffffff',
        black : '#000f08',
        // schist
        gray : {
          '50': '#f3f5f0',
          '100': '#e6e8df',
          '200': '#cfd3c3',
          Default: '#a9b195',
          '400': '#939d7e',
          '500': '#778161',
          '600': '#5c664a',
          '700': '#494f3c',
          '800': '#3c4133',
          '900': '#35392e',
          '950': '#1b1d16',
        },
        white_powder : '#fafaf2'
      },
      fontSize: {
        'display': ['4rem', {
          lineHeight: '100%',
          fontWeight: '800'
        }],
        'title-lg': ['2rem', {
          lineHeight: '100%',
          fontWeight: '800'
        }],
        'title-base': ['1.5rem', {
          lineHeight: '100%',
          fontWeight: '800'
        }],
        'title-sm': ['1rem', {
          lineHeight: '100%',
          fontWeight: '800'
        }],
        'title-xs': ['0.75rem', {
          lineHeight: '100%',
          fontWeight: '800'
        }],
        'body-lg': ['1.5rem', {
          lineHeight: '100%',
          fontWeight: '400'
        }],
        'body-base': ['1rem', {
          lineHeight: '100%',
          fontWeight: '400'

        }],
        'body-sm': ['0.75rem', {
          lineHeight: '100%',
          fontWeight: '400'
        }],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"), 
    plugin(function({ addUtilities }) {
      addUtilities({
        '.no-scrollbar::-webkit-scrollbar': {
          'display': 'none'
        },
        '.no-scrollbar': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',  
        }
      })
    })
  ],
}