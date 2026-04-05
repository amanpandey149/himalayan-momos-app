/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#E63946',
        primaryHover: '#D62828',
        accentYellow: '#FFB703',
        bgDark: '#121212',
        bgCard: '#1E1E1E',
        bgLight: '#2A2A2A',
        veg: '#2ECC71',
        nonVeg: '#E74C3C',
        whatsapp: '#25D366'
      },
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
        display: ['Playfair Display', 'serif'],
      },
      keyframes: {
        shimmer: {
          '100%': { transform: 'translateX(200%)' },
        }
      },
      animation: {
        shimmer: 'shimmer 2s infinite',
      }
    },
  },
  plugins: [],
}
