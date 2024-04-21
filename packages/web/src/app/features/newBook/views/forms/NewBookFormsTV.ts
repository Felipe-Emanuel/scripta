import { tv } from 'tailwind-variants'

export const newBookAboutBookFormTV = tv({
  base: 'size-full flex max-[499px]:flex-wrap gap-6 flex-shrink-0'
})

export const newBookAboutBookSideTV = tv({
  base: 'flex flex-col gap-6 w-full'
})

export const newBookAboutBookGenreAndThemeTV = tv({
  base: 'flex items-center gap-6'
})

export const newBookAboutBookSwitchSideTV = tv({
  base: 'w-full flex items-center justify-between'
})

export const newBookAboutBookSwitchTV = tv({
  base: 'w-full flex flex-col gap-2'
})

export const newBookMediaFormTV = tv({
  base: 'size-full flex max-[499px]:flex-wrap gap-2 items-center justify-evenly flex-shrink-0'
})

export const newBookMediaFormDragAndPasteTV = tv({
  base: 'h-[13.5rem] w-44 rounded-xl flex flex-col gap-2 items-center justify-center border-dotted border-2 border-white/50 duration-500',
  variants: {
    currentImage: {
      true: 'opacity-50 pointer-events-none',
      false: 'opacity-100 pointer-events-auto'
    }
  }
})

export const newBookMediaFormContentWrapperTV = tv({
  base: 'h-[13.5rem] w-44'
})

export const newBookMediaFormHeroWrapperTV = tv({
  base: 'relative size-full rounded-xl'
})

export const newBookMediaFormTrashImageTV = tv({
  base: 'absolute top-2 right-2 z-20'
})

export const newBookMediaFormHeroTV = tv({
  base: 'bg-cover object-cover size-full rounded-xl'
})

export const newBookMediaFormHeroFallbackTV = tv({
  base: 'size-full flex items-center justify-center'
})

export const newBookOverviewFormTV = tv({
  base: 'flex flex-wrap sm:flex-nowrap gap-4 md:gap-6'
})

export const newBookOverviewFormHeroSideTV = tv({
  base: 'flex gap-2 w-full'
})

export const newBookOverviewFormHeroTV = tv({
  base: 'h-40 sm:h-52 w-32 sm:w-40'
})

export const newBookOverviewFormHeroFallbackTV = tv({
  base: 'h-40 sm:h-52 w-32 sm:w-40 border-dotted border-2 rounded-xl border-white/50 bg-white/10'
})

export const newBookOverviewFormHeroSideInfoTV = tv({
  base: 'flex flex-col justify-between py-1'
})

export const newBookOverviewFormHeroSideChipsTV = tv({
  base: 'flex gap-2'
})

export const newBookOverviewFormHeroSideChipsTextTV = tv({
  base: 'text-[8px]'
})

export const newBookOverviewFormHeroSideTotalWordsTV = tv({
  base: 'flex items-center gap-2'
})

export const newBookOverviewFormHeroSideIconWrapperTV = tv({
  base: 'rounded-lg bg-primary sm:p-2 flex items-center justify-center'
})

export const newBookOverviewFormHeroSideButtonFallbackTV = tv({
  base: 'pointer-events-none opacity-50'
})

export const newBookOverviewFormDescriptionSideTV = tv({
  base: 'flex flex-col gap-4'
})

export const newBookOverviewFormDescriptionSideContentTV = tv({
  base: 'w-full max-w-96 h-44'
})

export const newBookSocialFormTV = tv({
  base: 'size-full flex gap-6 flex-shrink-0'
})
