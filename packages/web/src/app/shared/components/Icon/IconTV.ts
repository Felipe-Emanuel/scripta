import { tv } from 'tailwind-variants'

export const iconTv = tv({
  base: 'duration-500',
  variants: {
    size: {
      xxs: 'w-4 h-1', // w-16px h-1px
      xs: 'w-3 h-2', // w-12px h-8px
      sm: 'w-3 h-3', // w-12px h-12px
      md: 'w-4 h-4', // w-16px h-16px
      lg: 'w-6 h-6', // w-24px h-24px
      responsive: 'w-3 h-2 md:w-3 h-3'
    },
    color: {
      primary: 'text-primary',
      secondary: 'text-green-400',
      tertiary: 'text-tertiary',
      black: 'text-black',
      white: 'text-white',
      gray: 'text-gray-400',
      danger: 'text-error',
      warning: 'text-warning'
    }
  },
  defaultVariants: {
    color: 'primary'
  }
})
