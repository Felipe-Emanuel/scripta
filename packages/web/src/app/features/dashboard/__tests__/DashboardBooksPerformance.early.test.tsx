import React from 'react'
import { useBooksPerformanceController } from '@features/dashboard/controllers/booksPerformanceController'
import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { DashboardBooksPerformance } from '../views/DashboardBooksPerformance'

// Mock the BooksPerformance components
jest.mock('@features/booksPerformance', () => ({
  BooksPerformance: {
    root: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    filters: ({ handleGenre }: { handleGenre: () => void }) => (
      <div onClick={handleGenre}>Filters Component</div>
    ),
    graphic: jest.fn(() => <div>Graphic Component</div>),
    tabs: jest.fn(() => <div>Tabs Component</div>)
  }
}))

// Mock the useBooksPerformanceController hook
jest.mock('@features/dashboard/controllers/booksPerformanceController', () => ({
  useBooksPerformanceController: jest.fn()
}))

describe('DashboardBooksPerformance() DashboardBooksPerformance method', () => {
  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks()
  })

  describe('Happy Paths', () => {
    it('should render all components correctly with default data', () => {
      // Arrange: Mock the hook to return default data
      const mockController = useBooksPerformanceController as jest.Mock
      mockController.mockReturnValue({
        uniqueGenres: ['Fiction', 'Non-Fiction'],
        uniqueThemes: ['Adventure', 'Mystery'],
        selectedGenre: 'Fiction',
        selectedTheme: 'Adventure',
        catgories: ['Category1', 'Category2'],
        series: [{ name: 'Series1', data: [1, 2] }],
        tabs: ['Tab1', 'Tab2'],
        handleTabFilter: jest.fn(),
        handleGenre: jest.fn(),
        handleTheme: jest.fn()
      })

      // Act: Render the component
      render(<DashboardBooksPerformance />)

      // Assert: Check if all components are rendered
      expect(screen.getByText('Filters Component')).toBeInTheDocument()
      expect(screen.getByText('Graphic Component')).toBeInTheDocument()
      expect(screen.getByText('Tabs Component')).toBeInTheDocument()
    })

    it('should call handleGenre when a genre is selected', () => {
      // Arrange: Mock the hook with a handleGenre function
      const handleGenreMock = jest.fn()
      const mockController = useBooksPerformanceController as jest.Mock
      mockController.mockReturnValue({
        uniqueGenres: ['Fiction', 'Non-Fiction'],
        uniqueThemes: ['Adventure', 'Mystery'],
        selectedGenre: 'Fiction',
        selectedTheme: 'Adventure',
        catgories: ['Category1', 'Category2'],
        series: [{ name: 'Series1', data: [1, 2] }],
        tabs: ['Tab1', 'Tab2'],
        handleTabFilter: jest.fn(),
        handleGenre: handleGenreMock,
        handleTheme: jest.fn()
      })

      // Act: Render the component and simulate a genre selection
      render(<DashboardBooksPerformance />)
      fireEvent.click(screen.getByText('Filters Component'))

      // Assert: Check if handleGenre was called
      expect(handleGenreMock).toHaveBeenCalled()
    })
  })

  describe('Edge Cases', () => {
    it('should handle empty series data gracefully', () => {
      // Arrange: Mock the hook to return empty series data
      const mockController = useBooksPerformanceController as jest.Mock
      mockController.mockReturnValue({
        uniqueGenres: ['Fiction', 'Non-Fiction'],
        uniqueThemes: ['Adventure', 'Mystery'],
        selectedGenre: 'Fiction',
        selectedTheme: 'Adventure',
        catgories: ['Category1', 'Category2'],
        series: [],
        tabs: ['Tab1', 'Tab2'],
        handleTabFilter: jest.fn(),
        handleGenre: jest.fn(),
        handleTheme: jest.fn()
      })

      // Act: Render the component
      render(<DashboardBooksPerformance />)

      // Assert: Check if the graphic component handles empty series
      expect(screen.getByText('Graphic Component')).toBeInTheDocument()
    })

    it('should handle no genres or themes selected', () => {
      // Arrange: Mock the hook with no selected genre or theme
      const mockController = useBooksPerformanceController as jest.Mock
      mockController.mockReturnValue({
        uniqueGenres: ['Fiction', 'Non-Fiction'],
        uniqueThemes: ['Adventure', 'Mystery'],
        selectedGenre: '',
        selectedTheme: '',
        catgories: ['Category1', 'Category2'],
        series: [{ name: 'Series1', data: [1, 2] }],
        tabs: ['Tab1', 'Tab2'],
        handleTabFilter: jest.fn(),
        handleGenre: jest.fn(),
        handleTheme: jest.fn()
      })

      // Act: Render the component
      render(<DashboardBooksPerformance />)

      // Assert: Check if the filters component handles no selection
      expect(screen.getByText('Filters Component')).toBeInTheDocument()
    })
  })
})
