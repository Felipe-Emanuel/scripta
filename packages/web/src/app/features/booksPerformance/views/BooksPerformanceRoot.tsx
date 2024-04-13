import { Template } from '@shared/components'
import { TRootComponent } from '@shared/types'
import { booksPerformanceRootTV } from '../BookPerformanceTV'

export function BooksPerformanceRoot({ children }: TRootComponent) {
  return (
    <Template
      id="books-performance-root"
      background="tertiary-background"
      className={booksPerformanceRootTV()}
    >
      {children}
    </Template>
  )
}
