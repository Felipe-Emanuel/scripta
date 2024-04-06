import { tv } from 'tailwind-variants'

export const booksPerformanceRootTV = tv({
  base: 'w-full md:max-w-[850px] h-full xl:max-w-[650px]',
})

export const booksPerformanceGraphicTV = tv({
  base: 'w-full p-2 bg-bar-graphic-background backdrop-blur-md rounded-2xl h-full',
})

export const booksPerformanceTabsWrapperTV = tv({
  base: 'duration-300 w-20 h-16 sm:w-28 md:w-36 md:h-24 rounded-3xl relative',
})

export const booksPerformanceTabItemWrapperTV = tv({
  base: 'flex flex-col items-start gap-3 md:gap-8 p-2 relative duration-300 w-20 h-16 sm:w-28 md:w-36 md:h-24',
})

export const booksPerformanceTabItemContentTV = tv({
  base: 'flex items-center gap-2 md:gap-4',
})

export const booksPerformanceTabItemContentHeadTV = tv({
  base: 'md:w-8 md:h-8 rounded-lg bg-primary flex items-center justify-center',
})

export const bookPerformanceFiltersRootTV = tv({
  base: 'w-full flex gap-8 items-center justify-between',
})

export const bookPerformanceFiltersTitleTV = tv({
  base: 'w-full md:truncate',
})

export const bookPerformanceFiltersSelectedContentTV = tv({
  base: 'flex gap-2 items-center pt-2',
})

export const bookPerformanceFiltersSelectedWrapperTV = tv({
  base: 'flex w-fit flex-wrap md:flex-nowrap gap-4',
})

export const bookPerformanceFiltersAutocompleteTV = tv({
  base: 'w-full max-w-40 text-gray',
})

export const bookPerformanceFiltersAutocompleteItemTV = tv({
  base: 'w-full max-w-40',
})
