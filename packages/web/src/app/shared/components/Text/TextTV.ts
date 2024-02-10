import { tv } from 'tailwind-variants'

export const textTv = tv({
  base: 'font-inter duration-500 text-black dark:text-white',
  variants: {
    fontFamily: {
      inter: 'font-inter',
      'jacques-francois': 'font-jacques-francois',
    },
    size: {
      '2xl': 'md:text-lg lg:text-xl xl:text-2xl',
      xl: 'text-lg xl:text-xl',
      lg: 'md:text-md lg:text-lg',
      md: 'text-sm md:text-md',
      sm: 'text-xs sm:text-sm',
      xs: 'text-xs',
      xxs: 'text-xxs',
    },
    weight: {
      bold: 'font-bold',
      normal: 'font-normal',
      light: 'font-light',
      'semi-bold': 'font-500',
      black: 'font-900',
    },
    color: {
      secondary: 'light-secondary dark:dark-tertiary',
      black: 'text-black',
      white: 'text-white',
    },
    align: {
      center: 'text-center',
    },
  },
  defaultVariants: {
    size: 'md',
    weight: 'normal',
    fontFamily: 'inter',
  },
})
