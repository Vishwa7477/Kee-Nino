/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ivory:    '#F7F1E5',
        'ivory-dark': '#EDE5D0',
        navy:     '#0D315A',
        'navy-light': '#1A4A7A',
        gold:     '#C6922E',
        'gold-light': '#D4A843',
        'gold-pale': '#F0D98A',
        brown:    '#241812',
        blue:     '#547FC5',
        'blue-light': '#7FA3D8',
        green:    '#596B48',
        'cream':  '#FAF6EC',
      },
      fontFamily: {
        serif:  ['"Playfair Display"', '"Cormorant Garamond"', 'Georgia', 'serif'],
        display: ['"Cormorant Garamond"', '"Playfair Display"', 'Georgia', 'serif'],
        script: ['"Great Vibes"', '"Dancing Script"', 'cursive'],
        body:   ['"Lato"', '"Inter"', 'system-ui', 'sans-serif'],
        mono:   ['"JetBrains Mono"', 'monospace'],
      },
      letterSpacing: {
        widest: '0.25em',
        'ultra-wide': '0.35em',
        'mega-wide': '0.5em',
      },
      backgroundImage: {
        'paper-texture': "url('/textures/paper.svg')",
        'gold-gradient': 'linear-gradient(135deg, #C6922E 0%, #F0D98A 50%, #C6922E 100%)',
        'navy-gradient': 'linear-gradient(180deg, #0D315A 0%, #1A4A7A 100%)',
        'ivory-gradient': 'linear-gradient(180deg, #F7F1E5 0%, #EDE5D0 100%)',
      },
      animation: {
        'float':           'float 6s ease-in-out infinite',
        'float-slow':      'float 10s ease-in-out infinite',
        'float-delayed':   'float 8s ease-in-out 2s infinite',
        'petal-fall':      'petalFall 8s linear infinite',
        'draw-line':       'drawLine 2s ease forwards',
        'fade-up':         'fadeUp 0.8s ease forwards',
        'fade-in':         'fadeIn 1s ease forwards',
        'scale-in':        'scaleIn 0.6s ease forwards',
        'shimmer':         'shimmer 3s ease-in-out infinite',
        'pulse-gold':      'pulseGold 2s ease-in-out infinite',
        'number-flip':     'numberFlip 0.4s ease forwards',
        'tail-wag':        'tailWag 1.5s ease-in-out infinite',
        'paw-bounce':      'pawBounce 0.6s ease-in-out infinite alternate',
        'border-draw':     'borderDraw 3s ease forwards',
        'text-reveal':     'textReveal 1s ease forwards',
        'bloom':           'bloom 2s ease forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%':       { transform: 'translateY(-20px) rotate(3deg)' },
        },
        petalFall: {
          '0%':   { transform: 'translateY(-10%) translateX(0) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translateY(110vh) translateX(30px) rotate(720deg)', opacity: '0' },
        },
        drawLine: {
          '0%':   { strokeDashoffset: '1000' },
          '100%': { strokeDashoffset: '0' },
        },
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%':   { opacity: '0', transform: 'scale(0.8)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(198, 146, 46, 0.4)' },
          '50%':       { boxShadow: '0 0 0 12px rgba(198, 146, 46, 0)' },
        },
        numberFlip: {
          '0%':   { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        tailWag: {
          '0%, 100%': { transform: 'rotate(-10deg)' },
          '50%':       { transform: 'rotate(10deg)' },
        },
        pawBounce: {
          '0%':   { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-6px)' },
        },
        textReveal: {
          '0%':   { clipPath: 'inset(0 100% 0 0)' },
          '100%': { clipPath: 'inset(0 0% 0 0)' },
        },
        bloom: {
          '0%':   { opacity: '0', transform: 'scale(0.5) rotate(-10deg)' },
          '60%':  { transform: 'scale(1.05) rotate(2deg)' },
          '100%': { opacity: '1', transform: 'scale(1) rotate(0deg)' },
        },
      },
      transitionDuration: {
        '1500': '1500ms',
        '2000': '2000ms',
        '3000': '3000ms',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '88': '22rem',
        '92': '23rem',
        '100': '25rem',
        '112': '28rem',
        '128': '32rem',
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
      },
    },
  },
  plugins: [],
}
