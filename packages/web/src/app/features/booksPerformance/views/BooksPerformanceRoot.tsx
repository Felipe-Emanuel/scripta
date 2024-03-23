import { Template } from '@shared/components'
import { TRootComponent } from '@shared/types'

export function BooksPerformanceRoot({ children }: TRootComponent) {
  return (
    <Template
      background="tertiary-background"
      className="h-fit w-full max-w-[652px]"
    >
      {children}
    </Template>
  )
}
