import { TRootComponent } from '@shared/types'

export function GraphicsRoot({ children }: TRootComponent) {
  return <div className="h-52 w-fit">{children}</div>
}
