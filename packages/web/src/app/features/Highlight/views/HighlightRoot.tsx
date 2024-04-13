import { TRootComponent } from '@shared/types'

export function HighlightRoot({ children }: TRootComponent) {
  return (
    <div id="highlight-root" className="w-full max-w-[300px] h-[400px] rounded-2xl">
      {children}
    </div>
  )
}
