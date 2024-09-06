import { render, renderHook, screen, waitFor } from '@testing-library/react'
import { NewBookMediaForm } from '../views/forms/NewBookMediaForm'
import { useDraft } from '@shared/hooks/useDraft'
import { mockDraft } from '../mocks/mockDraft'
import userEvent from '@testing-library/user-event'

const renderComponent = () => render(<NewBookMediaForm />)

describe('NewBookMediaForm', () => {
  it('Should render correctly', () => {
    renderComponent()
  })

  it('Should render paste and drop image input', () => {
    renderComponent()

    const pasteAndDrop = screen.getByRole('presentation')

    expect(pasteAndDrop.firstChild?.textContent).toContain('Arraste sua capa aqui')
  })

  it('Should render hero fallback', () => {
    renderComponent()

    const fallbackHero = screen.getByText(/sua capa aparecerá aqui\.\.\./i)

    expect(fallbackHero.firstChild?.textContent).toBe('Sua capa aparecerá aqui...')
  })

  it('Should render correctly draft hero', () => {
    const { result } = renderHook(() => useDraft('newBook'))
    const { updateDraft } = result.current

    updateDraft(mockDraft)

    renderComponent()

    const hero = screen.getByRole('img', {
      name: /imagem de capa do novo livro/i
    })

    expect(hero.getAttribute('src')).toBe(mockDraft.heroPathUrl)
  })

  it('Should call clear image callback', async () => {
    renderComponent()

    const trashButton = screen.getByTestId('new-book-media-form-trash-hero')
    await userEvent.click(trashButton)

    await waitFor(() => {
      const fallbackHero = screen.getByText(/sua capa aparecerá aqui\.\.\./i)

      expect(fallbackHero).toBeTruthy()
    })
  })
})
