import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Surfaces
        paper: {
          DEFAULT: '#FAF6EC',
          2: '#F2EBD8',
          3: '#E8E0CB',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          2: '#FDFAF2',
        },
        // Ink
        ink: {
          DEFAULT: '#181C16',
          2: '#2B2F26',
        },
        muted: '#6C7064',
        faint: '#A8AB9D',
        line: {
          DEFAULT: '#E5DFCC',
          2: '#D9D2BC',
        },
        // Forest (primary)
        forest: {
          900: '#0E2A1F',
          800: '#143A2C',
          700: '#1F5641',
          600: '#2E6F55',
          500: '#3F8868',
          300: '#94B89F',
          100: '#D6E4D5',
          50: '#ECF1E2',
        },
        // Accents
        coral: {
          DEFAULT: '#DD7842',
          soft: '#F6D9BE',
        },
        gold: {
          DEFAULT: '#C29A3D',
          soft: '#F0E1B2',
        },
        rose: '#B85148',
        sky: '#6F94A6',
        // Dark mode overrides exposed as CSS vars
      },
      fontFamily: {
        display: ['Instrument Serif', 'Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Geist', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['Geist Mono', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        sm: '12px',
        DEFAULT: '18px',
        md: '24px',
        lg: '32px',
        xl: '40px',
        full: '9999px',
      },
      spacing: {
        pad1: '8px',
        pad2: '14px',
        pad3: '20px',
        pad4: '28px',
        pad5: '40px',
      },
      boxShadow: {
        sh1: '0 1px 2px rgba(20,24,17,.04), 0 1px 3px rgba(20,24,17,.04)',
        sh2: '0 4px 12px rgba(20,24,17,.05), 0 12px 28px rgba(20,24,17,.06)',
        sh3: '0 12px 32px rgba(20,24,17,.08), 0 32px 60px rgba(20,24,17,.10)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'slide-down': 'slideDown 0.4s ease-out',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
        'spin-slow': 'spin 3s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
      },
    },
  },
  plugins: [],
}

export default config
