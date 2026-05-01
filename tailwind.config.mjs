/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        celeste: {
          50:  '#e6f7fd',
          100: '#b3e8fa',
          200: '#80d9f7',
          300: '#4dcaf4',
          400: '#1abbf1',
          500: '#00AEEF',
          600: '#008bbf',
          700: '#00688f',
          800: '#00455f',
          900: '#00222f',
        },
      },
      fontFamily: {
        sans: ['Inter Variable', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Anton', 'sans-serif'],
        technical: ['Space Grotesk Variable', 'Space Grotesk', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
        'slide-in-right': 'slideInRight 0.4s ease-out forwards',
        'bounce-light': 'bounceLight 2s infinite',
        'pulse-slow': 'pulse 3s infinite',
        'pulse-color-brutal': 'pulseColorBrutal 4s steps(1) infinite',
      },
      keyframes: {
        pulseColorBrutal: {
          '0%, 100%': { color: '#030712' }, /* Black */
          '50%': { color: '#00AEEF' },      /* Celeste */
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        bounceLight: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
    },
  },
  plugins: [],
};
