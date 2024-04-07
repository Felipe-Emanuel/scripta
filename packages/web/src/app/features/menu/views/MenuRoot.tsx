import { TRootComponent } from '@shared/types'

export function MenuRoot({ children }: TRootComponent) {
  return (
    <div className="w-full flex items-center justify-between max-w-[1500px] m-auto py-4">
      {children}
    </div>
  )
}
