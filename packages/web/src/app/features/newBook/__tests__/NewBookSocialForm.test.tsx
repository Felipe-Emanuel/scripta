import { render, renderHook, screen } from '@testing-library/react'
import { NewBookSocialForm } from '../views/forms/NewBookSocialForm'
import { useDraft } from '@shared/hooks/useDraft'

jest.mock('react-hook-form', () => ({
  useFormContext: jest.fn(() => ({
    register: jest.fn(),
    formState: {
      errors: ''
    }
  }))
}))

const renderComponent = () => render(<NewBookSocialForm />)

describe('NewBookSocialForm', () => {
  it('Should render correctly', () => {
    renderComponent()
  })

  it('Should render a default value link', () => {
    const mockDraft = {
      socialLink: 'https://socialLink.com'
    }
    const { result } = renderHook(() => useDraft('newBook'))
    const { updateDraft } = result.current

    updateDraft(mockDraft)

    renderComponent()

    screen.logTestingPlaygroundURL()

    const socialLinkInput = screen.getByRole('textbox', {
      name: /link social/i
    })

    expect(socialLinkInput.getAttribute('value')).toBe(mockDraft.socialLink)
  })

  it('Should not broken ih havent draft and return a empty string as value', () => {
    const { result } = renderHook(() => useDraft('newBook'))
    const { clearDraft } = result.current

    clearDraft()

    renderComponent()

    const socialLinkInput = screen.getByRole('textbox', {
      name: /link social/i
    })

    expect(socialLinkInput.getAttribute('value')).toBe('')
  })
})
