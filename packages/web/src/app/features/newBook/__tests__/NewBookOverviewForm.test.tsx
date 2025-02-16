import { render, renderHook, screen } from '@testing-library/react'
import { NewBookOverviewForm } from '../views/forms/NewBookOverviewForm'
import { useDraft } from '@shared/hooks/useDraft'
import { mockDraft } from '../mocks/mockDraft'

const renderComponent = () => render(<NewBookOverviewForm />)

describe('NewBookOverviewForm fallbacks', () => {
  it('Should render correctly', () => {
    renderComponent()
  })

  it('Should render correctly hero fallback', () => {
    const { container } = renderComponent()

    const heroFallback = container.querySelector('div > div > div:nth-child(1) > div:nth-child(1)')

    expect(heroFallback).toBeTruthy()
  })

  it('Should render correctly title, gender, theme and isActive fallbacks', () => {
    renderComponent()

    const fallbackTitle = screen.getByText(/seu título/i)
    const fallbackGender = screen.getByText(/gênero \//i)
    const fallbackTheme = screen.getByText(/tema/i)
    const fallbackIsActive = screen.getByText(/oculto/i)

    expect(fallbackTitle.firstChild?.textContent).toBe('Seu título')
    expect(fallbackGender.firstChild?.textContent).toBe('Gênero /')
    expect(fallbackTheme.firstChild?.textContent).toBe('Tema')
    expect(fallbackIsActive.firstChild?.textContent).toBe('Oculto')
  })

  it('Should render 0 words and access button fallbacks', () => {
    renderComponent()

    const fallbackAccessButton = screen.getByRole('button', {
      name: /insira uma url/i
    })

    expect(fallbackAccessButton.firstChild?.textContent).toBe('Insira uma URL')
    expect(fallbackAccessButton.classList).toContain('pointer-events-none')
  })

  it('Should render correctly description fallback', () => {
    renderComponent()

    const fallbackDescription = screen.getByTestId('new-book-overview-form-description')

    expect(fallbackDescription.firstChild?.textContent).toBe(
      'Adicione uma descrição com até 1000 palavras que resuma bem o seu livro. Seja criativo e direto!'
    )
  })
})

describe('NewBookOverviewForm', () => {
  beforeAll(() => {
    const { result } = renderHook(() => useDraft('newBook'))
    const { updateDraft } = result.current

    updateDraft(mockDraft)
  })

  it('Should render correctly', () => {
    renderComponent()
  })

  it('Should render correctly hero', () => {
    renderComponent()

    const hero = screen.getByTestId('new-book-overview-form-hero')
    expect(hero.getAttribute('src')).toBe(mockDraft.heroPathUrl)
  })

  it('Should render correctly title, gender, theme, isActive and conclued', () => {
    renderComponent()

    const title = screen.getByText(/fake title/i)
    const gender = screen.getByText(/terror \//i)
    const theme = screen.getByText(/futuro/i)
    const conclued = screen.getByText(/concluído/i)
    const isActive = screen.getByText(/público/i)

    expect(title.firstChild?.textContent).toBe('Fake Title')
    expect(gender.firstChild?.textContent).toBe('Terror /')
    expect(theme.firstChild?.textContent).toBe('Futuro')
    expect(conclued.firstChild?.textContent).toBe('Concluído')
    expect(isActive.firstChild?.textContent).toBe('Público')
  })

  it('Should render correctly 10k words and access button', () => {
    renderComponent()
    const accessButton = screen.getByRole('button', {
      name: /acessar/i
    })

    expect(accessButton.firstChild?.textContent).toBe('Acessar')
    expect(accessButton.classList).not.toContain('pointer-events-none')
  })

  it('Should render correctly description', () => {
    renderComponent()

    const Description = screen.getByTestId('new-book-overview-form-description')

    expect(Description.firstChild?.textContent).toBe('a nice description')
  })
})
