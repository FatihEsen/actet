/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // F1-inspired color palette
        'racing-dark': '#0A0A0A',
        'racing-darker': '#050505',
        'carbon': '#1A1A1A',
        'carbon-light': '#2A2A2A',
        'neon-blue': '#00D4FF',
        'neon-red': '#FF3B3B',
        'neon-green': '#00FF94',
        'neon-orange': '#FF8C00',
        'neon-yellow': '#FFD700',
        'silver': '#C4C4C4',
        'silver-dark': '#8C8C8C',
        'warning': '#FF6B35',
        'danger': '#DC2626',
        'success': '#10B981',
      },
      fontFamily: {
        'racing': ['Orbitron', 'monospace'],
        'display': ['Rajdhani', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'blink': 'blink 1s ease-in-out infinite',
        'gauge-sweep': 'gauge-sweep 0.5s ease-out',
        'shift-light': 'shift-light 0.15s ease-in-out infinite',
      },
      keyframes: {
        blink: {
          '0%, 50%': { opacity: '1' },
          '51%, 100%': { opacity: '0.3' },
        },
        'gauge-sweep': {
          '0%': { transform: 'rotate(-90deg)' },
          '100%': { transform: 'rotate(var(--target-rotation))' },
        },
        'shift-light': {
          '0%, 100%': { backgroundColor: 'rgb(220, 38, 38)' },
          '50%': { backgroundColor: 'rgb(239, 68, 68)' },
        },
      },
      gridTemplateColumns: {
        'dashboard': 'repeat(auto-fit, minmax(300px, 1fr))',
        'controls': 'repeat(auto-fit, minmax(120px, 1fr))',
      },
      backdropBlur: {
        'xs': '2px',
      },
    },
  },
  plugins: [],
}