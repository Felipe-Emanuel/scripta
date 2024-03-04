import { tv } from 'tailwind-variants'

export const wordGoalsInputRootTV = tv({
  base: 'duration-150',
  variants: {
    visible: {
      visible: 'w-20',
      hidden: 'w-0',
    },
  },
  defaultVariants: {
    visible: 'hidden',
  },
})

export const wordGoalsInputFieldTV = tv({
  base: 'duration-150',
  variants: {
    visible: {
      visible: 'p-2 border-2',
      hidden: 'p-0 border-0',
    },
  },
  defaultVariants: {
    visible: 'hidden',
  },
})
