import { tv } from 'tailwind-variants'

export const iconTv = tv({
  base: 'duration-500 text-black dark:text-white',
  variants: {
    size: {
      xs: 'w-3 h-2', // w-12px h-8px
      sm: 'w-3 h-3', // w-12px h-12px
      md: 'w-4 h-4', // w-16px h-16px
      lg: 'w-6 h-6', // w-24px h-24px
    },
    color: {
      secondary: 'light-secondary dark:dark-tertiary',
      black: 'text-black',
      white: 'text-white',
    },
  },
})
