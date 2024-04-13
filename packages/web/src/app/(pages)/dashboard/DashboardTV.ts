import { tv } from 'tailwind-variants'

export const wordsRowTV = tv({
  base: 'flex flex-wrap min-[1075px]:flex-nowrap items-center justify-center gap-4 w-full'
})

export const performanceRowTV = tv({
  base: 'flex max-[911px]:flex-col-reverse flex-wrap min-[911px]:flex-nowrap gap-4 w-full md:max-w-[850px] min-[1075px]:max-w-full m-auto'
})
