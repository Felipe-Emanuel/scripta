import { tv } from 'tailwind-variants'

export const bookInformationRootTV = tv({
  base: 'w-full max-[1023px]:max-w-[300px] lg:w-[650px] 2xl:w-[1030px] h-[400px] md:p-4 flex flex-col items-center lg:items-start justify-center overflow-hidden'
})

export const bookInformationHeaderWrapperTV = tv({
  base: 'relative flex flex-col gap-2'
})

export const welcomeTV = tv({
  base: 'hidden lg:flex'
})

export const descriptionTV = tv({
  base: 'w-full max-w-[680px]'
})

export const chipsWrapperTV = tv({
  base: 'flex items-center gap-1'
})

export const cardInfoWrapperTV = tv({
  base: 'flex max-[1023px]:flex-col flex-row max-[1023px]:flex-wrap gap-2 items-center justify-center md:justify-start'
})

export const renderInfoWrapperTV = tv({
  base: 'flex items-center justify-center gap-2 md:gap-4 max-[1023px]:flex-wrap'
})

export const characterSideWrapperTV = tv({
  base: 'flex lg:flex-col gap-2 md:gap-4'
})

export const characterSideContentTV = tv({
  base: 'relative size-full'
})

export const hitsSideWrapperTV = tv({
  base: 'flex lg:flex-col gap-2 md:gap-4'
})

export const publishedHeroWrapperTV = tv({
  base: 'relative w-full h-40'
})

export const heroTV = tv({
  base: 'object-cover w-32 h-40'
})

export const iconContentTV = tv({
  base: 'bg-white p-2 rounded-xl flex items-center justify-center'
})

export const infoActionsWrapperTV = tv({
  base: 'absolute top-3 right-4'
})

export const infoActionsDropdownTV = tv({
  base: 'bg-white/10 backdrop-blur-md ring-1 ring-white/50'
})

export const renderInfoTV = tv({
  base: 'flex items-center justify-between p-0 md:p-0 lg:p-4 lg:w-40'
})

export const renderInfoLabelsTV = tv({
  base: 'hidden lg:flex flex-col'
})

export const renderInfoIconWeapperTV = tv({
  base: 'rounded-lg bg-primary p-2 flex items-center justify-center'
})

export const editModalTV = tv({
  base: 'bg-[#121214] max-[280px]:overflow-y-scroll max-[280px]:h-screen scrollbar-hide'
})

export const modalBodyTV = tv({
  base: 'flex flex-col gap-6'
})

export const modalBodyHeroSideTV = tv({
  base: 'flex max-[280px]:flex-col gap-4 w-full items-center'
})

export const dragAndPasteTV = tv({
  base: 'relative w-44 flex items-center justify-center cursor-pointer'
})

export const clearImageButtonTV = tv({
  base: 'absolute top-1 right-1'
})

export const isDragingFallbackTV = tv({
  base: 'absolute inset-0 p-2 flex items-center justify-center bg-black/50'
})

export const copyAndPasteHeroTV = tv({
  base: 'flex-shrink-0 rounded-2xl bg-cover h-44 w-32 size-full'
})

export const inputsWrapperTV = tv({
  base: 'flex flex-col gap-4 w-full'
})

export const inputSideTV = tv({
  base: 'flex gap-4 w-full'
})

export const inputDescriptionTV = tv({
  base: 'flex flex-col gap-2'
})
