import { tv } from 'tailwind-variants'

export const profileRootTV = tv({
  base: 'duration-300 w-full flex-1 md:min-w-56 max-w-[590px] h-44 min-[500px]:h-[320px] relative',
})

export const profileHeroTV = tv({
  base: 'w-[650px] lg:w-[750px] h-[350px] min-[500px]:min-h-[755px] bg-white/25 -top-10 min-[500px]:-top-44 -left-10',
  variants: {
    local: {
      root: 'absolute',
      image: 'pointer-events-none',
    },
  },
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
      visible: 'w-64 sm:w-72',
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
      hidden: 'w-0 ring-0',
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
      visible: 'p-2',
      hidden: 'p-0 ring-0',
    },
  },
  defaultVariants: {
    visible: 'hidden',
  },
})
