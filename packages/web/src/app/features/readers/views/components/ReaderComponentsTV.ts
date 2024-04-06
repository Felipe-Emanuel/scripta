import { tv } from 'tailwind-variants'

export const cardTV = tv({
  base: 'flex-shrink-0 h-full max-h-72'
})

export const cardHeaderTV = tv({
  base: 'pb-0 pt-2 px-4 flex-col items-start'
})

export const cardHeaderTitleAndChipTV = tv({
  base: 'flex w-full items-center justify-between'
})

export const cardHeaderTitleTV = tv({
  base: 'text-large truncate'
})

export const cardHeaderSpanInfoTV = tv({
  base: 'text-gray-400 text-start py-2'
})

export const cardBodyTV = tv({
  base: 'overflow-visible py-2 flex items-center justify-center'
})

export const cardBodyImageTV = tv({
  base: 'object-cover rounded-xl h-full max-h-44'
})

export const cardFooterTV = tv({
  base: 'justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10'
})

export const cardAccessButtonTV = tv({
  base: 'text-tiny text-white bg-black/20'
})

export const tabWrapperTV = tv({
  base: 'py-4 flex w-full'
})

export const tabTV = tv({
  base: '',
  variants: {
    disabled: {
      true: 'pointer-events-none',
      false: ''
    }
  }
})

export const tabContentWrapperTV = tv({
  base: 'flex items-center space-x-2'
})

export const tabContentChipTV = tv({
  base: 'w-full max-w-60 h-fit pointer-events-auto'
})

export const readerWrapperTV = tv({
  base: 'w-full max-w-60 h-fit mt-4'
})

export const readerCardHeaderTV = tv({
  base: 'pb-0 py-2 px-4 flex-col items-start'
})

export const readerCardBodyTV = tv({
  base: 'overflow-visible py-2 flex items-center justify-center'
})

export const readerCardBodyImageTV = tv({
  base: 'object-cover rounded-xl pointer-events-none'
})

export const readerCardFooterLabelTV = tv({
  base: 'text-tiny text-white/80'
})
