import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      inter: '"Inter", sans-serif',
      'jacques-francois': '"Jacques Francois", serif',
    },
    fontSize: {
      '3xl': '96px',
      '2xl': '72px',
      xl: '44px',
      lg: '24px',
      md: '16px',
      sm: '14px',
      xs: '12px',
      xxs: '10px',
    },
    colors: {
      transparent: 'transparent',
      black: '#000000',
      white: '#ffffff',

      primary: '#0075FF',
      tertiary: '#7551FF',
      error: '#F53C2B',

      green: {
        400: '#05CD99',
      },

      gray: {
        400: '#A0AEC0',
      },
    },
    extend: {
      backgroundImage: {
        'hero-pattern': "url('/assets/images/background.png')",
        'primary-background':
          'linear-gradient(159.02deg, #272F9D 14.25%, #0D123A 56.45%, #020515 86.14%)',
        'secondary-background':
          'linear-gradient(127.09deg, rgba(6, 11, 40, 0.94) 19.41%, rgba(10, 14, 35, 0.49) 76.65%)',
      },
    },
    keyframes: {
      'single-animate-ping': {
        '0%': { scale: '1.2', opacity: '1' },
        '50%': { scale: '1.5', opacity: '0.5' },
        '100%': { scale: '1.7', opacity: '0' },
      },
    },
    animation: {
      'single-animate-ping': 'single-animate-ping 500ms linear forwards',
    },
  },
  plugins: [],
}
export default config
