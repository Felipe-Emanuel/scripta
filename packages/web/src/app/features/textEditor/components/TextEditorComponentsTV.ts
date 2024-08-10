import { tv } from 'tailwind-variants'

export const basicIdentationsTV = tv({
  base: 'flex flex-shrink-0'
})

export const floatingMenuContentButtonsTV = tv({
  base: 'flex w-full backdrop-blur-2xl data-[active=true]:bg-primary'
})

export const floatingMenuContentButtonsIconTV = tv({
  base: 'flex items-center justify-center bg-white rounded-sm size-8'
})

export const floatingMenuContentButtonsContentTV = tv({
  base: 'flex flex-col justify-start items-start flex-1'
})

export const fontStylesWrapperTV = tv({
  base: 'flex flex-1 items-center gap-2'
})

export const fontStylesIconTV = tv({
  base: 'pointer-events-none items-center hidden sm:flex'
})

export const fontStylesSeparatorTV = tv({
  base: 'w-[1px] bg-primary mx-[10px] h-full'
})

export const fontStylesSelectTV = tv({
  base: 'flex flex-[2]'
})

export const fontStylesTooltipWeightButtonTV = tv({
  base: 'data-[active=true]:bg-gray-100 bg-transparent p-2 z-40 hover:bg-gray-50 group rounded-md duration-300 w-full flex items-center justify-between'
})

export const fontStylesTooltipWeightSmallTV = tv({
  base: 'text-black group-hover:text-black/75'
})

export const fontStylesButtonTV = tv({
  base: 'bg-transparent w-full flex items-center justify-between'
})

export const fontStylesButtonSmallTV = tv({
  base: 'text-black'
})

export const spacingsIconWrapperTV = tv({
  base: 'pointer-events-none flex items-center'
})

export const spacingsIconSpanTV = tv({
  base: 'text-default-400 text-small'
})

export const toolbarDropdownItemContentTV = tv({
  base: 'flex items-center gap-2 bg-transparent rounded-sm size-full data-[active=true]:bg-primary group'
})

export const toolbarDropdownItemContentTextTV = tv({
  base: 'group-data-[active=true]:text-white'
})

export const toolbarTogleItemTV = tv({
  base: 'flex-shrink-0 flex-grow-0 basis-auto text-black/75 h-[25px] px-[5px] rounded inline-flex text-[13px] leading-none items-center justify-center bg-white ml-1.5 outline-none duration-700 hover:bg-primary/75 hover:text-white focus:relative focus:shadow-[0_0_0_2px] focus:shadow-primary/75 first:ml-0 data-[active=true]:bg-primary data-[active=true]:text-white'
})

export const toolbarEditorHeaderTV = tv({
  base: 'w-12 data-[open=false]:bg-transparent data-[open=true]:w-full h-16 overflow-hidden duration-500 absolute top-0 data-[open=true]:left-0 data-[open=false]:right-0 z-10 flex flex-shrink-0 items-center p-[10px] bg-white/10 backdrop-blur-md data-[open=true]:border-b-1 border-white/50 shadow-[0_2px_10px] shadow-black'
})

export const toolbarEditorHeaderContentTV = tv({
  base: 'flex items-center scrollbar-thin overflow-x-auto overflow-y-hidden size-full'
})

export const toolbarEditorHeaderSeparatorTV = tv({
  base: 'w-[1px] bg-primary mx-[10px] h-full'
})

export const toolbarEditorHeaderAlignTV = tv({
  base: 'flex flex-shrink-0'
})

export const toolbarEditorHeaderSpacingsTV = tv({
  base: 'flex items-center'
})

export const toolbarEditorHeaderFormTV = tv({
  base: 'flex w-full items-center justify-start gap-2'
})

export const toolbarEditorHeaderColorTV = tv({
  base: 'rounded-full outline-none h-4 w-6 p-0'
})

export const toolbarEditorHeaderToggleIconTV = tv({
  base: 'group-hover:text-gray-400'
})

export const toolbarEditorTV = tv({
  base: 'z-50 flex items-center p-[10px] gap-2 w-full min-w-max rounded-md bg-black/75 backdrop-blur-sm ring-1 ring-white/50 shadow-[0_2px_10px] shadow-black'
})

export const toolbarEditorBasicsTV = tv({
  base: 'hidden sm:flex'
})

export const toolbarEditorSeparatorTV = tv({
  base: 'w-[1px] bg-primary mx-[10px] h-7'
})

export const textEditorFooterTV = tv({
  base: 'flex items-center content-between w-full'
})

export const textEditorFooterFullScreenIconTV = tv({
  base: 'group-hover:text-gray-400'
})
