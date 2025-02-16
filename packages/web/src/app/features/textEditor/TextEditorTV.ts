import { tv } from 'tailwind-variants'

export const textEditorRootTV = tv({
  base: 'w-full flex justify-center'
})

export const textEditorTV = tv({
  base: 'flex flex-col py-2 pt-4 w-[80%] h-[75vh] duration-300 data-[fullscreen=true]:z-50 data-[fullscreen=true]:inset-0 data-[fullscreen=true]:fixed data-[fullscreen=true]:w-screen data-[fullscreen=true]:h-screen bg-black/75 data-[fullscreen=true]:backdrop-blur-3xl relative rounded-lg overflow-x-hidden'
})

export const textEditorScrollShadowTV = tv({
  base: 'flex flex-col items-center justify-center size-full p-4 pt-10 rounded-sm scrollbar-thin'
})

export const textEditorEditorContentV = tv({
  base: 'prose prose-invert size-full'
})

export const textEditorFloatingMenuTV = tv({
  base: 'bg-black/85 h-28 overflow-y-auto backdrop-blur-2xl border-1 border-white/72 p-2 shadow-[0_2px_10px] shadow-black'
})
