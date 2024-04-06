import { TRootComponent } from '@shared/types'

export function GraphicsRoot({ children, className }: TRootComponent) {
  return <div className={`h-52 w-fit ${className}`}>{children}</div>
}
