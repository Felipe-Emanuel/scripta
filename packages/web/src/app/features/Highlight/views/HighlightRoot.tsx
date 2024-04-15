import { TRootComponent } from '@shared/types'
import { highlightRootTV } from '../HighlightTV'

export function HighlightRoot({ children }: TRootComponent) {
  return (
    <div id="highlight-root" className={highlightRootTV()}>
      {children}
    </div>
  )
}
