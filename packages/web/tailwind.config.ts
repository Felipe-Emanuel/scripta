import type { Config } from 'tailwindcss'
import { nextui } from '@nextui-org/react'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    '../../node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    fontFamily: {
      inter: '"Inter", sans-serif',
      'jacques-francois': '"Jacques Francois", serif'
    },
    fontSize: {
      '3xl': '96px',
      '2xl': '72px',
      xl: '44px',
      lg: '24px',
      md: '16px',
      sm: '14px',
      xs: '12px',
      xxs: '10px'
    },
    colors: {
      transparent: 'transparent',
      default: '#0A102D',
      black: '#000000',
      white: '#ffffff',
      primary: '#0075FF',
      tertiary: '#7551FF',
      error: '#F53C2B',
      warning: '#EF5013',

      green: {
        400: '#05CD99',
        500: '#01B574'
      },
      gray: {
        400: '#A0AEC0'
      }
    },
    extend: {
      backgroundImage: {
        'primary-background':
          'linear-gradient(159.02deg, #272F9D 14.25%, #0D123A 56.45%, #020515 86.14%)',
        'secondary-background':
          'linear-gradient(127.09deg, rgba(6, 11, 40, 0.94) 19.41%, rgba(10, 14, 35, 0.49) 76.65%)',
        'tertiary-background':
          'linear-gradient(126.97deg, rgba(6, 11, 40, 0.74) 28.26%, rgba(10, 14, 35, 0.71) 91.2%)',
        'bar-graphic-background':
          'linear-gradient(126.97deg, #060C29 28.26%, rgba(4, 12, 48, 0.5) 91.2%)',
        'sidebar-background':
          'linear-gradient(111.84deg, rgba(6, 11, 38, 0.94) 59.3%, rgba(26, 31, 55, 0) 100%)'
      }
    },
    keyframes: {
      'single-animate-ping': {
        '0%': { scale: '1.2', opacity: '1' },
        '50%': { scale: '1.5', opacity: '0.5' },
        '100%': { scale: '1.7', opacity: '0' }
      },
      ping: {
        '0%': { scale: '1', opacity: '1' },
        '50%': { scale: '0.9', opacity: '5' },
        '100%': { scale: '1', opacity: '1' }
      },
      'border-animation': {
        '0%': { borderColor: 'purple', boxShadow: '0 0 1rem purple' },
        '33%': { borderColor: 'orange', boxShadow: '0 0 1rem orange' },
        '66%': { borderColor: 'green', boxShadow: '0 0 1rem pink' },
        '100%': { borderColor: 'purple', boxShadow: '0 0 1rem purple' }
      }
    },
    animation: {
      'single-animate-ping': 'single-animate-ping 500ms linear forwards',
      ping: 'ping 1000ms linear infinite',
      'border-animation': 'border-animation 4s linear infinite'
    }
  },
  darkMode: 'class',
  plugins: [
    nextui({
      addCommonColors: true,
      themes: {
        dark: {
          colors: {
            default: 'transparent'
          }
        }
      }
    }),
    require('tailwind-scrollbar')
  ]
}
export default config
