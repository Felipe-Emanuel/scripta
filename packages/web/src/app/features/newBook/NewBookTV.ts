import { tv } from 'tailwind-variants'

export const newBookRootTV = tv({
  base: 'relative size-full py-2 md:py-4 z-20'
})

export const newBookTriggerTV = tv({
  base: 'z-30',
  variants: {
    showForm: {
      true: 'fixed',
      false: 'relative'
    }
  },
  defaultVariants: {
    showForm: false
  }
})

export const newBookTriggerIconDraftTV = tv({
  base: 'absolute top-0 right-0'
})

export const newBookProgressBarWrapperTV = tv({
  base: 'relative w-full max-w-[50rem] flex items-center justify-between bg-primary h-1 mb-12 lg:mt-24 md:mb-16 rounded-full'
})

export const newBookProgressBarContentWrapperTV = tv({
  base: 'flex flex-col items-center justify-center relative top-3 duration-500'
})

export const progressBarWhiteBarTV = tv({
  base: 'bg-white duration-500 h-1 absolute',
  variants: {
    stage: {
      ABOUT_BOOK: 'w-[10%] md:w-[6%]',
      MEDIA: 'w-[36%]',
      SOCIAL: 'w-[65%]',
      OVERVIEW: 'w-[100%]'
    }
  },
  defaultVariants: {
    stage: 'ABOUT_BOOK'
  }
})

export const newBookProgressBarMarkerTV = tv({
  base: 'duration-500 rounded-full bg-white ring-1 ring-primary mb-2',
  variants: {
    isCurrent: {
      true: 'size-6',
      false: 'size-4'
    }
  },
  defaultVariants: {
    isCurrent: false
  }
})

export const newBookPathnameTV = tv({
  base: 'absolute -top-12 duration-200 z-30',
  variants: {
    showForm: {
      true: 'opacity-100 delay-500',
      false: 'opacity-0 delay-200'
    }
  }
})

export const newBookFormWrapperRootTV = tv({
  base: 'fixed duration-500 inset-0 z-0 overflow-hidden bg-primary-background flex items-center justify-center pt-12 pl-24 md:pl-28 pr-2 md:pr-4',
  variants: {
    isFirstAccess: {
      true: 'hidden',
      false: 'visible'
    }
  }
})

export const newBookFormWrapperTV = tv({
  base: 'w-full max-w-[50rem] flex flex-col overflow-hidden py-3'
})

export const newBookAnimatedFormWrapperTV = tv({
  base: 'bg-primary-background flex flex-col gap-6 rounded-2xl md:p-6 h-80 overflow-y-scroll sm:overflow-y-hidden overflow-x-scroll'
})

export const newBookAnimatedFormContentTV = tv({
  base: 'flex max-[499px]:flex-col items-center gap-6 px-8 w-full'
})

export const newBookAnimatedFormTitleTV = tv({
  base: 'pt-4 pl-4'
})

export const newBookAnimatedFormContentRootTV = tv({
  base: 'flex items-center gap-6 w-full'
})

export const newBookAnimatedFormContentWrapperTV = tv({
  base: 'w-full duration-500 flex flex-col gap-2 sm:gap-6 shrink-0'
})

export const newBookFormActionsTV = tv({
  base: 'flex items-center w-full py-2 md:py-4',
  variants: {
    progressPositive: {
      true: 'justify-between',
      false: 'justify-end'
    }
  }
})
