import { tv } from 'tailwind-variants'

export const profileRootTV = tv({
  base: 'sm:w-full max-w-[590px] h-72',
})

export const profileHeroTV = tv({
  base: 'hidden sm:flex bg-center absolute inset-0',
})

export const profileInfoWrapperTV = tv({
  base: 'w-full max-w-48 h-full flex flex-col justify-between z-10 pointer-events-none',
})

export const profileInfoHeaderTV = tv({
  base: 'h-32 flex flex-col gap-4 sm:gap-8',
})

export const profileleInfoWelcomeTV = tv({
  base: 'w-full max-w-40 leading-6',
})

export const profileleInfoFormWrapperTV = tv({
  base: 'duration-150 flex items-center gap-2 relative pointer-events-auto h-8',
  variants: {
    visible: {
      visible: 'w-72',
      hidden: 'w-32',
    },
  },
  defaultVariants: {
    visible: 'hidden',
  },
})

export const profileleInfoInputRootTV = tv({
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

export const profileleInfoInputFieldTV = tv({
  base: 'duration-150',
  variants: {
    visible: {
      visible: 'p-4 border-2',
      hidden: 'p-0 border-0',
    },
  },
  defaultVariants: {
    visible: 'hidden',
  },
})
