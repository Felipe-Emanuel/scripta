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
      publishedUrl: 'https://publishedUrl.com'
    }
    const { result } = renderHook(() => useDraft('newBook'))
    const { updateDraft } = result.current

    updateDraft(mockDraft)

    renderComponent()

    const publishedUrlInput = screen.getByRole('textbox', {
      name: /link de acesso/i
    })

    expect(publishedUrlInput.getAttribute('value')).toBe(mockDraft.publishedUrl)
  })

  it('Should not broken ih havent draft and return a empty string as value', () => {
    const { result } = renderHook(() => useDraft('newBook'))
    const { clearDraft } = result.current

    clearDraft()

    renderComponent()

    const publishedUrlInput = screen.getByRole('textbox', {
      name: /link de acesso/i
    })

    expect(publishedUrlInput.getAttribute('value')).toBe('')
  })
})
