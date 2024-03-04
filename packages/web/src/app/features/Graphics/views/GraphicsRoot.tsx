import { TRootComponent } from '@shared/types'

export function GraphicsRoot({ children }: TRootComponent) {
  return <div className="bg-transparent h-52">{children}</div>
}
