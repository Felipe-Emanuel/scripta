import { tv } from 'tailwind-variants'

export const readerRootTV = tv({
  base: 'p-0 sm:p-0 md:p-0 lg:p-0 h-[508px] w-full'
})

export const readerDetailsTV = tv({
  base: 'absolute z-40 bg-secondary-background px-2 h-full w-fit flex items-center justify-center'
})

export const readerDetailsButtonTV = tv({
  base: 'absolute top-3 right-3 z-40'
})

export const readerBookDetailsTV = tv({
  base: 'absolute z-30 right-0 bg-secondary-background p-2 h-full w-full max-w-72'
})

export const readerBookDetailsDividerTV = tv({
  base: 'mt-4 w-full h-0.5 bg-gradient-to-r from-transparent via-gray-400 to-transfrom-transparent'
})

export const readerBookDetailsULTV = tv({
  base: 'overflow-scroll pt-4 scrollbar-hide flex h-full pb-44 flex-col gap-4'
})

export const readerBookInputTV = tv({
  base: 'w-full max-w-64 m-auto'
})

export const readerBookButtonTV = tv({
  base: 'absolute transition-all duration-700 top-3 right-3',
  variants: {
    isShowingBookDetails: {
      true: 'max-[300px]:-translate-x-44 -translate-x-48 z-40',
      false: 'translate-x-0'
    }
  }
})
