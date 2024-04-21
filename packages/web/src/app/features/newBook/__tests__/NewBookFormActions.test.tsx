import { render, screen, waitFor } from '@testing-library/react'
import { State } from '@features/books/BooksUtils'
import { NewBookFormActions } from '../views/components/NewBookFormActions'
import userEvent from '@testing-library/user-event'

const handleBackFormState = jest.fn()
const handleNextFormState = jest.fn()
const handleNewBookSubmit = jest.fn()
let state: State = {
  label: 'Mídia',
  lastLabel: 'Sobre o livro',
  progress: 2,
  stage: 'MEDIA'
}

const renderComponent = () =>
  render(
    <NewBookFormActions
      state={state}
      handleNewBookSubmit={handleNewBookSubmit}
      handleBackFormState={handleBackFormState}
      handleNextFormState={handleNextFormState}
    />
  )

describe('NewBookFormActions', () => {
  it('Should render correctly', () => {
    renderComponent()
  })

  it('Should call handleBackFormState and handleNextFormState callbacks', async () => {
    renderComponent()

    const nextButton = screen.getByRole('button', {
      name: /mídia/i
    })

    const backButton = screen.getByRole('button', {
      name: /sobre o livro/i
    })

    await userEvent.click(nextButton)
    await userEvent.click(backButton)

    await waitFor(() => {
      expect(handleNextFormState).toHaveBeenCalled()
      expect(handleBackFormState).toHaveBeenCalled()
    })
  })

  it('Should render just next button', () => {
    state = {
      ...state,
      progress: 1
    }

    renderComponent()

    const buttons = screen.getAllByTestId('new-book-form-action')

    expect(buttons).toHaveLength(1)
    expect(buttons[0].textContent).toBe(state.label)
  })
})
