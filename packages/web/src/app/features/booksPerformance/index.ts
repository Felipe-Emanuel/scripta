import { BookPerformanceFilters } from '@features/booksPerformance/views/BookPerformanceFilters'
import { BooksPerformanceGraphic } from '@features/booksPerformance/views/BooksPerformanceGraphic'
import { BooksPerformanceRoot } from '@features/booksPerformance/views/BooksPerformanceRoot'
import BooksPerformanceTabs from '@features/booksPerformance/views/BooksPerformanceTabs'

export const BooksPerformance = {
  root: BooksPerformanceRoot,
  tabs: BooksPerformanceTabs,
  filters: BookPerformanceFilters,
  graphic: BooksPerformanceGraphic,
}
