import { tv } from 'tailwind-variants'

export const templateTV = tv({
  base: 'relative p-4 md:p-7 rounded-2xl flex gap-2 md:gap-5',
  variants: {
    size: {
      fit: 'w-fit h-fit',
      full: 'w-full h-full',
    },
    background: {
      'secondary-background': 'bg-secondary-background',
      'primary-background': 'bg-primary-background',
    },
    'flex-direction': {
      row: 'flex-row',
      col: 'flex-col',
    },
    overflow: {
      hidden: 'overflow-hidden',
      'scroll-x': 'overflow-x-scroll',
      'scroll-x-hidden': 'overflow-x-hidden',
      'scroll-y': 'overflow-y-scroll flex-col',
      'scroll-y-hidden': 'overflow-y-hidden',
    },
  },
  defaultVariants: {
    size: 'fit',
    'flex-direction': 'col',
    background: 'secondary-background',
    opacity: 100,
  },
})
