/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: 'var(--color-gold-50, #FDFBF7)',
          100: 'var(--color-gold-100, #F9F5EC)',
          200: 'var(--color-gold-200, #F1E6D0)',
          300: 'var(--color-gold-300, #E6D3AF)',
          400: 'var(--color-gold-400, #D8BC86)',
          500: 'var(--color-gold-500, #C5A059)',
          600: 'var(--color-gold-600, #AA823E)',
          700: 'var(--color-gold-700, #8A642B)',
          800: 'var(--color-gold-800, #6E4E24)',
          900: 'var(--color-gold-900, #5A3F1F)',
        },
        themeBg: 'var(--theme-bg, #09110e)',
        themeCard: 'var(--theme-card, #0d1613)',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'serif'],
        display: ['"Cinzel"', 'serif'],
        script: ['"Great Vibes"', 'cursive'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        spinSlow: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        }
      },
      animation: {
        float: 'float 4s ease-in-out infinite',
        spinSlow: 'spinSlow 12s linear infinite',
      }
    },
  },
  plugins: [],
}
