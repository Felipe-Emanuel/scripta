import { tv } from 'tailwind-variants'

export const buttonRootTv = tv({
  base: 'px-2 py-4 h-fit w-full disabled:bg-gray-400 hover:disabled:bg-gray-400 disabled:cursor-default flex items-center justify-center m-auto rounded-xl duration-500 hover:bg-primary/75 cursor-pointer bg-primary border-0',
  variants: {
    variant: {
      provider:
        'bg-white/10 border-2 border-white/35 w-16 h-16 hover:bg-white/25',
    },
  },
})
