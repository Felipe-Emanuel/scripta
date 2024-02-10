import { tv } from 'tailwind-variants'

export const mainTv = tv({
  base: 'duration-500 size-full relative',
  variants: {
    themeOptions: {
      darkMode: 'bg-dark-secondary',
      lightMode: 'bg-white',
    },
    overflow: {
      hidden: 'overflow-hidden',
      'scroll-x': 'overflow-x-scroll',
      'scroll-x-hidden': 'overflow-x-hidden',
      'scroll-y': 'overflow-y-scroll flex-col',
      'scroll-y-hidden': 'overflow-y-hidden',
    },
  },
})
