import { tv } from 'tailwind-variants'

export const buttonRootTv = tv({
  base: 'p-2 duration-500 border-0 flex',
  variants: {
    buttonStyle: {
      primary:
        'px-2 py-4 h-fit w-full disabled:bg-gray-400 hover:disabled:bg-gray-400 disabled:cursor-default flex items-center justify-center m-auto rounded-xl duration-500 hover:bg-primary/75 cursor-pointer bg-primary border-0',
      secondary:
        'bg-transparent hover:bg-transparent ring ring-1 border-primary',
      provider:
        'bg-white/10 ring ring-1 duration-300 border-white/35 hover:bg-white/25 gap-2 flex px-8 py-4',
      text: 'bg-transparent hover:bg-transparent border-0 pointer-events-auto w-fit p-0 m-0 disabled:bg-transparent disabled:hover:bg-transparent',
    },
  },
})
