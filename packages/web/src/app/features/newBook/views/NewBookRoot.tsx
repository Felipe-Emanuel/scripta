import { TRootComponent } from '@shared/types'
import { newBookRootTV } from '../NewBookTV'

export function NewBookRoot({ children }: TRootComponent) {
  return (
    <section id="new-book-root" className={newBookRootTV()}>
      {children}
    </section>
  )
}
