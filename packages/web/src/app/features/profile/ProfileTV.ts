import { tv } from 'tailwind-variants'

export const profileRootTV = tv({
  base: 'sm:w-full max-w-[590px] h-full max-h-[280px]',
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
