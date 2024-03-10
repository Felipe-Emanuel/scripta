import { tv } from 'tailwind-variants'

export const referralTrackingHeaderRootTV = tv({
  base: 'flex items-center justify-between z-40',
})

export const renderOptionsTV = tv({
  base: 'h-fit w-44 p-2 flex items-center justify-between rounded duration-300 bg-primary cursor-pointer hover:bg-primary/75',
})

export const renderOptionsContentTV = tv({
  base: 'flex flex-col gap-2',
})

export const renderOptionsIconTV = tv({
  base: 'size-fit p-1 rounded-md flex items-center justify-center bg-white',
})
