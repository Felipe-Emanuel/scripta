import { tv } from 'tailwind-variants'

export const actionWrapperTV = tv({
  base: 'px-3 py-1 bg-transparent cursor-pointer',
  variants: {
    state: {
      isActive:
        'border-[0.5px] border-light-primary rounded-full dark:border-dark-primary animate-slide-in',
      notActive: 'border-0 animate-slide-out',
    },
  },
})

export const actionLabelTV = tv({
  variants: {
    state: {
      isActive: 'text-light-primary dark:text-dark-primary',
      notActive: 'text-light-grey-200 dark:text-dark-grey-400',
    },
  },
})
