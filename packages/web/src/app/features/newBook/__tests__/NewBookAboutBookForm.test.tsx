import { render, renderHook, screen } from '@testing-library/react'
import { NewBookAboutBookForm } from '../views/forms/NewBookAboutBookForm'
import { mockDraft } from '../mocks/mockDraft'
import { useDraft } from '@shared/hooks/useDraft'

jest.mock('react-hook-form', () => ({
  useFormContext: jest.fn(() => ({
    register: jest.fn(),
    formState: {
      errors: {
        description: ''
      }
    }
  }))
}))

jest.mock('@features/newBook/controller', () => ({
  useNewBookController: jest.fn(() => ({
    isActive: true,
    conclued: true,
    setValue: jest.fn()
  }))
}))

const renderComponent = () => render(<NewBookAboutBookForm />)

describe('NewBookAboutBookForm', () => {
  it('Should render correctly', () => {
    renderComponent()
  })

  it('Should render all default values from draft', () => {
    const { result } = renderHook(() => useDraft('newBook'))
    const { updateDraft } = result.current

    updateDraft({
      ...mockDraft
    })

    renderComponent()

    const titleInput = screen.getByRole('textbox', {
      name: /título/i
    })
    const genderInput = screen.getByRole('textbox', {
      name: /gênero/i
    })
    const themeInput = screen.getByRole('textbox', {
      name: /tema/i
    })
    const descriptionTextArea = screen.getByRole('textbox', {
      name: /descreva sua obra\.\.\./i
    })
    const totalWordsInput = screen.getByRole('spinbutton', {
      name: /total de palavras/i
    })
    const isActiveSwitch = screen.getByTestId('new-book-about-book-form-is-active')
    const concluedSwitch = screen.getByTestId('new-book-about-book-form-conclued')

    expect(titleInput.getAttribute('value')).toBe('fake title')
    expect(genderInput.getAttribute('value')).toBe('terror')
    expect(themeInput.getAttribute('value')).toBe('futuro')
    expect(descriptionTextArea.textContent).toBe('a nice description')
    expect(totalWordsInput.getAttribute('value')).toBe('10.0k')
    expect(isActiveSwitch.getAttribute('data-selected')).toBe('true')
    expect(concluedSwitch.getAttribute('data-selected')).toBe('true')
  })
})
