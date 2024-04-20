import { TRootComponent } from '@shared/types'

export function NewBookRoot({ children }: TRootComponent) {
  return (
    <section id="new-book-root" className="relative size-full py-2 md:py-4 z-20">
      {children}
    </section>
  )
}
