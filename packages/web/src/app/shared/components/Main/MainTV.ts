import { tv } from 'tailwind-variants'

export const mainTv = tv({
  base: 'p-2 sm:p-4 md:p-6 lg:p-8 duration-500 min-h-screen relative overflow-x-hidden bg-primary-background',
  variants: {
    overflow: {
      hidden: 'overflow-hidden',
      'scroll-x': 'overflow-x-scroll',
      'scroll-x-hidden': 'overflow-x-hidden',
      'scroll-y': 'overflow-y-scroll flex-col',
      'scroll-y-hidden': 'overflow-y-hidden',
    },
  },
})
