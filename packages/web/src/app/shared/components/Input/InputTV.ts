import { tv } from 'tailwind-variants'

export const inputRootTV = tv({
  base: 'relative flex flex-col w-full gap-2 bg-white/10 border-white/25 rounded-2xl ring-1 ring-white/50'
})

export const inputLabelTV = tv({
  base: 'pt-2 pl-4'
})

export const inputFieldTV = tv({
  base: 'text-white w-full font-inter px-4 pb-1 bg-transparent placeholder:text-gray-400 outline-none ring-0 border-0 rounded-full',
  variants: {
    variant: {
      thin: 'px-2 placeholder:text-sm text-sm'
    }
  },
  defaultVariants: {
    variant: 'thin'
  }
})

export const errorTV = tv({
  base: 'absolute -bottom-5 left-4'
})
