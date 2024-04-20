import { tv } from 'tailwind-variants'

export const progressBarWhiteBarTV = tv({
  base: 'bg-white duration-500 h-1 absolute',
  variants: {
    stage: {
      ABOUT_BOOK: 'w-[5%]',
      MEDIA: 'w-[35%]',
      SOCIAL: 'w-[65%]',
      OVERVIEW: 'w-[100%]'
    }
  },
  defaultVariants: {
    stage: 'ABOUT_BOOK'
  }
})
