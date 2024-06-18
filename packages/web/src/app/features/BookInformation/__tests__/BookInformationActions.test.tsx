import { render, screen, waitFor } from '@testing-library/react'
import { BookInformationActions } from '../views/BookInformationActions'
import { BookResultMock } from '@shared/mocks/BookResult'
import userEvent from '@testing-library/user-event'

const action = {
  isDeleting: false,
  isDesactiving: false,
  isEditing: false
}

const toggleDeleting = jest.fn()
const toggleDesactiving = jest.fn()
const toggleEditing = jest.fn()
const handleDeleteBook = jest.fn()

jest.mock('react-query', () => ({
  useQueryClient: jest.fn(() => ({
    getQueryData: jest.fn()
  })),
  useQuery: jest.fn(() => ({
    data: [BookResultMock]
  }))
}))

jest.mock('@shared/hooks/contexts/useBook', () => ({
  useBook: jest.fn(() => ({
    selectedBook: BookResultMock
  }))
}))

jest.mock('../controller', () => ({
  useBookController: jest.fn(() => ({
    action,
    toggleDeleting,
    toggleDesactiving,
    toggleEditing,
    handleDeleteBook,
    setIsCharactersCardHovered: jest.fn(),
    isCharactersCardHovered: false
  }))
}))

const renderComponent = () => render(<BookInformationActions />)

describe('BookInformationActions', () => {
  it('Should render correctly', () => {
    renderComponent()
  })

  it('Should call toggle Delete', async () => {
    renderComponent()

    const trigger = screen.getByRole('button')
    await userEvent.click(trigger)

    const deleteItem = await screen.findByTestId('dorpdown-item-book-information-action-delete')

    userEvent.click(deleteItem)

    await waitFor(() => {
      expect(toggleDeleting).toHaveBeenCalled()
    })
  })

  it('Should call toggle Desactive', async () => {
    renderComponent()

    const trigger = screen.getByRole('button')
    await userEvent.click(trigger)

    const desactiveItem = await screen.findByTestId(
      'dorpdown-item-book-information-action-desactive'
    )

    userEvent.click(desactiveItem)

    await waitFor(() => {
      expect(toggleDesactiving).toHaveBeenCalled()
    })
  })

  it('Should call toggle Editd', async () => {
    renderComponent()

    const trigger = screen.getByRole('button')
    await userEvent.click(trigger)

    const editItem = await screen.findByTestId('dorpdown-item-book-information-action-edit')

    userEvent.click(editItem)

    await waitFor(() => {
      expect(toggleEditing).toHaveBeenCalled()
    })
  })

  it('Should render /tornar público/ label', async () => {
    BookResultMock.isActive = false
    renderComponent()

    const trigger = screen.getByRole('button')
    await userEvent.click(trigger)

    const desactiveItem = await screen.findByTestId(
      'dorpdown-item-book-information-action-desactive'
    )

    await waitFor(() => {
      expect(desactiveItem.textContent).toBe('Tornar público')
    })
  })
})
