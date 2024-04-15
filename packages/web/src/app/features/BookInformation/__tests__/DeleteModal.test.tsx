import { render, screen, waitFor } from '@testing-library/react'
import { DeleteModal } from '../views/modals/DeleteModal'
import { BookResultMock } from '@shared/mocks/BookResult'
import userEvent from '@testing-library/user-event'

const handleDeleteBook = jest.fn()
const toggleDeleting = jest.fn()

const renderComponent = () =>
  render(
    <DeleteModal
      book={BookResultMock}
      handleDeleteBook={handleDeleteBook}
      isDeleting
      toggleDeleting={toggleDeleting}
    />
  )

describe('DeleteModal', () => {
  it('Should render correctly', () => {
    renderComponent()
  })

  it('Should render correctly book title at warning message', () => {
    renderComponent()

    const deleteBookWarning = screen.getByText(/você gostaria realmente de/i)

    expect(deleteBookWarning.firstChild?.textContent).toBe(
      'Você gostaria realmente de deletar o livro A Nice Title?'
    )
  })

  it('Should call toggleDeleting function', async () => {
    renderComponent()

    const cancelButton = screen.getByRole('button', {
      name: /melhor não\.\.\./i
    })

    await userEvent.click(cancelButton)

    await waitFor(() => {
      expect(toggleDeleting).toHaveBeenCalled()
    })
  })

  it('Should call handleDeleteBook an toggleDeleting function', async () => {
    renderComponent()

    const handleDelete = screen.getByRole('button', {
      name: /acredito que sim\.\.\./i
    })

    await userEvent.click(handleDelete)

    await waitFor(() => {
      expect(handleDeleteBook).toHaveBeenCalled()
      expect(toggleDeleting).toHaveBeenCalled()
    })
  })
})
