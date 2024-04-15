import { tv } from 'tailwind-variants'

export const highlightRootTV = tv({
  base: 'w-full max-w-[300px] h-[400px] rounded-2xl'
})

export const cardHeaderTV = tv({
  base: 'absolute z-10 top-0 flex-col pb-8 items-start bg-gradient-to-b from-black/75 via-black/50 to-transparent'
})

export const cardHeaderTitleTV = tv({
  base: 'text-tiny pointer-events-none'
})

export const cardHeaderGenderTV = tv({
  base: 'text-tiny pointer-events-none text-green-500/75'
})

export const cardHeaderThemeTV = tv({
  base: 'text-tiny pointer-events-none'
})

export const nextImageTV = tv({
  base: 'z-0 min-h-full'
})

export const cardFooterTV = tv({
  base: 'absolute flex flex-col gap-1 bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10'
})

export const cardFooterContentWrapperTV = tv({
  base: 'w-full flex items-center justify-between'
})

export const cardFooterContentTV = tv({
  base: 'flex items-center justify-between gap-1 flex-wrap md:flex-nowrap w-full'
})

export const cardFooterContentCardTV = tv({
  base: 'flex flex-col gap-1'
})

export const highlightFallbackImageTV = tv({
  base: 'bg-cover absolute inset-0 z-0'
})

export const cardHeaderWrapperTV = tv({
  base: 'absolute z-10 top-1 flex-col items-start'
})

export const cardFooterWrapperTV = tv({
  base: 'absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between'
})

export const cardWrapperTV = tv({
  base: 'w-full max-w-[300px] h-[400px] overflow-hidden'
})
