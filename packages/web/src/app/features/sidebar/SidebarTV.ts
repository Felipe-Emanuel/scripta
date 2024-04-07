import { tv } from 'tailwind-variants'

export const sidebarRootTv = tv({
  base: 'bg-sidebar-background duration-500 z-30 fixed left-0 top-0 bottom-0 p-4 flex flex-col gap-4 items-center overflow-hidden',
  variants: {
    isOpen: {
      true: 'w-64',
      false: 'w-20 md:w-24 min-[1890px]:w-64'
    }
  },
  defaultVariants: {
    isOpen: false
  }
})

export const overflowTv = tv({
  base: 'fixed inset-0 z-30 duration-500 pointer-events-none min-[1890px]:hidden',
  variants: {
    isOpen: {
      true: 'bg-black/50',
      false: 'bg-black/0'
    }
  },
  defaultVariants: {
    isOpen: false
  }
})

export const sidebarHeaderTv = tv({
  base: 'flex flex-col items-center justify-center gap-4 w-full'
})

export const sidebarHeaderDivisorTv = tv({
  base: 'my-4 w-full h-0.5 bg-gradient-to-r from-transparent via-gray-400 to-transfrom-transparent'
})

export const sidebarItemsRootTv = tv({
  base: 'flex flex-col mx-2 items-center justify-start w-full'
})

export const sidebarLinkTv = tv({
  base: 'absolute inset-0 px-1'
})

export const sidebarLinkContentTv = tv({
  base: 'w-full h-full flex items-center space-x-2',
  variants: {
    isOpen: {
      true: 'justify-start',
      false: 'max-[1890px]:justify-center'
    }
  },
  defaultVariants: {
    isOpen: false
  }
})

export const sidebarIconWrapperTv = tv({
  base: 'cursor-pointer border-0 rounded-xl size-9 flex flex-shrink-0 items-center justify-center duration-500 bg-black/20'
})

export const sidebarIconlTv = tv({
  base: '',
  variants: {
    isOpen: {
      true: 'size-4',
      false: 'max-[1890px]:size-6'
    }
  },
  defaultVariants: {
    isOpen: false
  }
})

export const sidebarLinkLabelTv = tv({
  base: '',
  variants: {
    isOpen: {
      true: 'visible',
      false: 'max-[1890px]:hidden'
    }
  },
  defaultVariants: {
    isOpen: false
  }
})
