import { render, screen, waitFor } from '@testing-library/react'
import { DesactiveModal } from '../views/modals/DesactiveModal'
import { BookResultMock } from '@shared/mocks/BookResult'
import userEvent from '@testing-library/user-event'

const handleDesactiveBook = jest.fn()
const toggleDesactiving = jest.fn()

const renderComponent = () =>
  render(
    <DesactiveModal
      book={BookResultMock}
      handleDesactiveBook={handleDesactiveBook}
      isDesactiving
      toggleDesactiving={toggleDesactiving}
    />
  )

describe('DesactiveModal', () => {
  it('Should render correctly', () => {
    renderComponent()
  })

  it('Should render correctly book title at warning message', () => {
    renderComponent()

    const deleteBookWarning = screen.getByText(/você gostaria realmente/i)

    expect(deleteBookWarning.firstChild?.textContent).toBe(
      'Você gostaria realmente de ocultar o livro A Nice Title?'
    )
  })

  it('Should call toggleDesactiving function', async () => {
    renderComponent()

    const cancelButton = screen.getByRole('button', {
      name: /por hora não\.\.\./i
    })

    await userEvent.click(cancelButton)

    await waitFor(() => {
      expect(toggleDesactiving).toHaveBeenCalled()
    })
  })

  it('Should call handleDeleteBook an toggleDesactiving function', async () => {
    renderComponent()

    const handleDesactive = screen.getByRole('button', {
      name: /por enquanto\.\.\./i
    })

    await userEvent.click(handleDesactive)

    await waitFor(() => {
      expect(handleDesactiveBook).toHaveBeenCalled()
      expect(toggleDesactiving).toHaveBeenCalled()
    })
  })

  it('Should render all correctly when isActive is false', async () => {
    BookResultMock.isActive = false
    renderComponent()

    const warningMessage = screen.getByText(/você gostaria realmente de tornar/i)

    expect(warningMessage.firstChild?.textContent).toBe(
      'Você gostaria realmente de tornar o livro A Nice Title público?'
    )

    const handleActiveButton = screen.getByRole('button', {
      name: /sim, gostaria!/i
    })

    await userEvent.click(handleActiveButton)

    await waitFor(() => {
      expect(handleDesactiveBook).toHaveBeenCalled()
      expect(toggleDesactiving).toHaveBeenCalled()
    })
  })
})
