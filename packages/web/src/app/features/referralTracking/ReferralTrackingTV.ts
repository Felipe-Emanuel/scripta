import { tv } from 'tailwind-variants'

export const referralTrackingRootTV = tv({
  base: 'w-full md:max-w-[850px] h-full xl:max-w-[650px]',
})

export const referralTrackingContentWrapperTV = tv({
  base: 'flex justify-between items-center relative',
})

export const referralTrackingGraphicTV = tv({
  base: 'hidden min-[500px]:flex relative -left-6 -top-10 z-0',
})

export const referralTrackingInfoInfoTemplateTV = tv({
  base: 'bg-primary-background rounded-xl flex flex-col justify-center items-start px-4 w-full xl:max-w-72 h-20',
})

export const referralTrackingInfoWrapperTV = tv({
  base: 'flex flex-col gap-10 w-full justify-between',
})

export const referralTrackingHeaderRootTV = tv({
  base: 'flex items-center justify-between z-40',
})

export const renderOptionsContentTV = tv({
  base: 'flex flex-col gap-2',
})

export const renderOptionsIconTV = tv({
  base: 'size-fit p-1 rounded-md flex items-center justify-center bg-white',
})

export const renderOptionsRootTV = tv({
  base: 'h-fit w-full p-2 flex items-center justify-between rounded duration-300 bg-primary cursor-pointer hover:bg-primary/50',
  variants: {
    disabled: {
      true: 'pointer-events-none bg-primary/50',
      false: 'pointer-events-auto',
    },
  },
})
