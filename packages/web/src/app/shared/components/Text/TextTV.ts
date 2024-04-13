import { tv } from 'tailwind-variants'

export const textTv = tv({
  base: 'font-inter duration-500 m-0',
  variants: {
    fontFamily: {
      inter: 'font-inter',
      'jacques-francois': 'font-jacques-francois'
    },
    size: {
      '2xl': 'md:text-lg lg:text-xl xl:text-2xl',
      xl: 'text-lg xl:text-xl',
      lg: 'md:text-md lg:text-lg',
      md: 'text-sm md:text-md',
      sm: 'text-xs sm:text-sm',
      xs: 'text-xs',
      xxs: 'text-xxs'
    },
    weight: {
      bold: 'font-bold',
      normal: 'font-normal',
      light: 'font-light',
      'semi-bold': 'font-500',
      black: 'font-900'
    },
    color: {
      secondary: 'text-green-400',
      black: 'text-black',
      tertiary: 'text-tertiary',
      white: 'text-white',
      gray: 'text-gray-400',
      error: 'text-error',
      warning: 'text-warning',
      'green-500': 'text-green-500'
    },
    textStyle: {
      uppercase: 'uppercase',
      lowercase: 'lowercase'
    },
    align: {
      center: 'text-center'
    }
  },
  defaultVariants: {
    size: 'md',
    weight: 'normal',
    fontFamily: 'inter',
    color: 'white'
  }
})
