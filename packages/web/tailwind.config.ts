import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    fontFamily: {
      inter: '"Inter", sans-serif',
      'jacques-francois': '"Jacques Francois", serif',
    },
    fontSize: {
      '2xl': '96px',
      xl: '72px',
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

      light: {
        primary: '#eeeeee',
        secondary: '#847d7d',
      },

      dark: {
        primary: '#04032f',
        secondary: '#45436d',
        tertiary: '#d9d9d9',
      },
    },
    boxShadow: {
      base: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    },
    extend: {},
  },
  plugins: [],
}
export default config
