import { tv } from 'tailwind-variants'

export const menuRootTV = tv({
  base: 'w-full flex items-center justify-between max-w-[1500px] m-auto pt-4'
})

export const menuActionWrapperTV = tv({
  base: 'flex items-center gap-1 w-fit'
})

export const menuActionContentTV = tv({
  base: 'flex items-center gap-1'
})

export const autocompleteTV = tv({
  base: 'text-gray-400'
})

export const autocompleteItemWrapperTV = tv({
  base: 'flex items-center gap-2'
})

export const autocompleteItemIconTV = tv({
  base: 'cursor-pointer border-0 rounded-lg size-6 flex items-center justify-center duration-500 bg-primary'
})

export const helperWrapperTV = tv({
  base: 'overflow-hidden rounded-xloverflow-hidden flex flex-col gap-2 fixed backdrop-blur-3xl bg-gray-400/25 ring-1 ring-gray-400/50 p-2 rounded-xl z-50',
  variants: {
    currentHelper: {
      true: 'w-full max-w-52 lg:max-w-72 xl:max-w-96 opacity-100 duration-1000',
      false: 'size-0 opacity-0 duration-0 inset-0 pointer-events-none'
    }
  },
  defaultVariants: {
    currentHelper: false
  }
})

export const closeIconTV = tv({
  base: 'absolute right-0 top-0 z-20'
})

export const currentHelperHeaderWrapperTV = tv({
  base: 'flex items-center gap-2'
})

export const currentHelperIconWrapperTV = tv({
  base: 'cursor-pointer border-0 rounded-xl size-9 flex flex-shrink-0 items-center justify-center duration-500 bg-primary'
})
