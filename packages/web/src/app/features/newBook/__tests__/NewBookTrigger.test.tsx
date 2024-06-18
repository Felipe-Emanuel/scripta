import { render, renderHook, screen, waitFor } from '@testing-library/react'
import { NewBookTrigger } from '../views/NewBookTrigger'
import { useDraft } from '@shared/hooks/useDraft'
import userEvent from '@testing-library/user-event'

const handleToggleCreateBook = jest.fn()
const showForm = false

jest.mock('@shared/hooks/contexts/useBook', () => ({
  useBook: jest.fn(() => ({
    handleToggleCreateBook,
    showForm
  }))
}))

const renderComponent = () => render(<NewBookTrigger />)

describe('NewBookTrigger', () => {
  it('Should render correctly', () => {
    renderComponent()
  })

  it('Should render a icon info about a new book draft', () => {
    const fakeDraft = {
      content: 'mocked'
    }

    const { result } = renderHook(() => useDraft('newBook'))
    const { updateDraft } = result.current
    updateDraft(fakeDraft)

    const { container } = renderComponent()

    const infoIcon = container.querySelector('div:nth-child(2) > button > div > svg > path')

    expect(infoIcon).toBeTruthy()
  })

  it('Should call handleToggleCreateBook function', async () => {
    renderComponent()

    const trigger = screen.getByRole('button', {
      name: /novo livro/i
    })

    await userEvent.click(trigger)

    await waitFor(() => {
      expect(handleToggleCreateBook).toHaveBeenCalled()
    })
  })
})
