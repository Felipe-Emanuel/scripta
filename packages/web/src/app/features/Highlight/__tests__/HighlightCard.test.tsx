import { render, screen, waitFor } from '@testing-library/react'
import { HighlightCard } from '../views/HighlightCard'
import { TBookResponse } from '@shared/types'
import { BookResultMock } from '@shared/mocks/BookResult'
import userEvent from '@testing-library/user-event'

const choiseBookToSeeInfo = jest.fn()

jest.mock('react-query', () => ({
  useQueryClient: jest.fn(() => ({
    getQueryData: jest.fn()
  })),
  useQuery: jest.fn(() => ({
    data: [
      BookResultMock,
      {
        ...BookResultMock,
        id: 'asdhiop',
        hits: 70000
      }
    ] as TBookResponse[]
  }))
}))

jest.mock('@shared/hooks/contexts/useBook', () => ({
  useBook: jest.fn(() => ({
    choiseBookToSeeInfo,
    selectedBook: BookResultMock
  }))
}))

const renderComponent = () => render(<HighlightCard />)

describe('HighlightCard', () => {
  it('Should render correctly', () => {
    renderComponent()
  })

  it('Should render correctly gender and theme', async () => {
    renderComponent()

    const gender = await screen.findByText(/Love/i)
    const theme = await screen.findByText(BookResultMock.Theme)

    await waitFor(() => {
      expect(gender.firstChild?.textContent).toBe('Love /')
      expect(theme.firstChild?.textContent).toBe(BookResultMock.Theme)
    })
  })

  it('Should render details button and call your function', async () => {
    renderComponent()

    const detailButton = await screen.findByText(/Detalhes/i)

    await userEvent.click(detailButton)

    await waitFor(() => {
      expect(choiseBookToSeeInfo).toHaveBeenCalled()
    })
  })

  it('Should render all footer card info properties', () => {
    renderComponent()

    const characters = screen.getByText(/0 Personagens/i)
    const words = screen.getByText(/35.3k Palavras/i)
    const reactions = screen.getByText(/0 Reações/i)
    const hits = screen.getByText(/70.0k Acessos/i)

    expect(characters.firstChild?.textContent).toBe('0 Personagens')
    expect(words.firstChild?.textContent).toBe('35.3k Palavras')
    expect(reactions.firstChild?.textContent).toBe('0 Reações')
    expect(hits.firstChild?.textContent).toBe('70.0k Acessos')
  })
})
