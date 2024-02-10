import { tv } from 'tailwind-variants'

export const titleTv = tv({
  base: 'font-inter duration-500 text-black dark:text-white m-0',
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
    },
    weight: {
      bold: 'font-bold',
      normal: 'font-normal',
      light: 'font-light',
      'semi-bold': 'font-500',
      black: 'font-black',
    },
    color: {
      secondary: 'light-secondary dark:dark-tertiary',
      black: 'text-black',
      white: 'text-white',
    },
  },
  defaultVariants: {
    size: 'lg',
    weight: 'normal',
    fontFamily: 'inter',
  },
})
