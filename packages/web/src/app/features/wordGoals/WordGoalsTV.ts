import { tv } from 'tailwind-variants'

export const wordGoalsRootTV = tv({
  base: 'w-full min-[500px]:w-52 max-w-[450px] sm:w-60 items-center h-[320px] justify-center',
})

export const wordGoalsContentWrapperTV = tv({
  base: 'w-full max-w-56 flex flex-col items-center justify-center',
})

export const wordGoalsInfoWrapperTV = tv({
  base: 'flex flex-col gap-4 bg-primary-background rounded-xl p-2 opacity-90 w-full h-20',
})

export const wordGoalsInfoHeaderTV = tv({
  base: 'flex justify-between items-center w-[90%] m-auto',
})

export const wordGoalsInfoContentTV = tv({
  base: 'flex justify-between items-center h-8',
})

export const wordGoalsInputRootTV = tv({
  base: 'duration-150',
  variants: {
    visible: {
      visible: 'w-16',
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
      visible: 'p-2 ring ring-1',
      hidden: 'p-0 ring-0',
    },
  },
  defaultVariants: {
    visible: 'hidden',
  },
})
