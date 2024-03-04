import { tv } from 'tailwind-variants'

export const authRootTv = tv({
  base: 'flex size-full fixed top-0 left-0 bg-transparent',
})

export const textLinkTV = tv({
  base: 'hover:text-white/75 cursor-pointer',
})

export const formRootTV = tv({
  base: 'xl:w-[400px] flex flex-col gap-2 sm:gap-4',
})

export const authFormRootTV = tv({
  base: 'lg:p-10 m-auto flex items-center justify-center',
})

export const authLeftSideRootTV = tv({
  base: 'relative hidden overflow-hidden sm:flex w-1/2 items-center justify-center',
})

export const animatedHeroTV = tv({
  base: 'absolute z-20 animate-single-animate-ping',
})

export const animatedHeroTextWrapperTV = tv({
  base: 'z-30 flex flex-col items-center justify-center pointer-events-none',
})

export const authRightSideRootTV = tv({
  base: 'relative flex items-center justify-center w-full md:w-1/2',
})

export const buttonsProvidersTV = tv({
  base: 'flex items-center justify-center gap-4 w-full',
})
