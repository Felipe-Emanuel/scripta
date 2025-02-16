'use client'

import { BooksPerformance } from '@features/booksPerformance'
import { useBooksPerformanceController } from '@features/dashboard/controllers/booksPerformanceController'

export function DashboardBooksPerformance() {
  const {
    uniqueGenres,
    uniqueThemes,
    selectedGenre,
    selectedTheme,
    catgories,
    series,
    tabs,
    handleTabFilter,
    handleGenre,
    handleTheme
  } = useBooksPerformanceController()

  return (
    <BooksPerformance.root>
      <BooksPerformance.filters
        selectedGenre={selectedGenre}
        selectedTheme={selectedTheme}
        handleGenre={handleGenre}
        handleTheme={handleTheme}
        uniqueGenres={uniqueGenres}
        uniqueThemes={uniqueThemes}
      />
      <BooksPerformance.graphic catgories={catgories} series={series || []} />
      <BooksPerformance.tabs handleTabFilter={handleTabFilter} tabs={tabs} />
    </BooksPerformance.root>
  )
}
