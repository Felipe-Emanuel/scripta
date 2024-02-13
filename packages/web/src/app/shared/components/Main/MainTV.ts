import { tv } from 'tailwind-variants'

export const mainTv = tv({
  base: 'size-full relative w-screen h-screen bg-primary-background',
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
