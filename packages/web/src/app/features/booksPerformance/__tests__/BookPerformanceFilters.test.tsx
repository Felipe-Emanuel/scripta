import { render, screen, waitFor } from '@testing-library/react'
import user from '@testing-library/user-event'
import { BookPerformanceFilters } from '../views/BookPerformanceFilters'

const selectedGenre = ''
const selectedTheme = ''
const handleGenre = jest.fn()
const handleTheme = jest.fn()
const uniqueGenres = [
  {
    label: 'FakeGenre',
    value: 'fakeGenre',
  },
]
const uniqueThemes = [
  {
    label: '',
    value: '',
  },
]

describe('BookPerformanceFilters', () => {
  const renderComponent = () =>
    render(
      <BookPerformanceFilters
        selectedGenre={selectedGenre}
        selectedTheme={selectedTheme}
        handleGenre={handleGenre}
        handleTheme={handleTheme}
        uniqueGenres={uniqueGenres}
        uniqueThemes={uniqueThemes}
      />,
    )

  it('should render correctly', () => {
    const { container } = renderComponent()

    expect(container).toBeTruthy()
  })

  it('should select a filter correctly', async () => {
    renderComponent()

    const genreSelect = screen.getByRole('combobox', {
      name: /gênero/i,
      hidden: true,
    })

    await user.click(genreSelect)
    const autoCompleteItem = await screen.findByTestId('item-fakeGenre')
    await user.click(autoCompleteItem)

    await waitFor(() => {
      expect(handleGenre).toHaveBeenCalledWith(uniqueGenres[0].value)
    })
  })
})
