import { tv } from 'tailwind-variants'

export const inputRootTV = tv({
  base: 'flex flex-col gap-2',
})

export const inputFieldTV = tv({
  base: 'text-white font-inter p-4 placeholder:text-gray-400 bg-white/10 border-white/25 rounded-2xl outline-none ring-1 ring-white/50',
})
