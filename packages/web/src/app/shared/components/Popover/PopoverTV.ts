import { tv } from 'tailwind-variants'

export const popoverTriggerTV = tv({
  base: 'cursor-pointer border-0 rounded-xl size-9 flex items-center justify-center duration-500 bg-white/10 hover:bg-white',
})

export const popoverContentWrapperTV = tv({
  base: 'absolute z-10 -left-40 top-12 size-fit p-2 sm:p-4 flex flex-col gap-4 bg-white/90 rounded-xl',
})
