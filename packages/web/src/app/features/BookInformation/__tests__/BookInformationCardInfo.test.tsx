import { render, screen } from '@testing-library/react'
import { BookInformationCardInfo } from '../views/BookInformationCardInfo'
import { BookResultMock } from '@shared/mocks/BookResult'

jest.mock('@features/menu/controller', () => ({
  useMenuController: jest.fn(() => ({
    clearing: jest.fn()
  }))
}))

jest.mock('react-query', () => ({
  useQueryClient: jest.fn(() => ({
    getQueryData: jest.fn()
  })),
  useQuery: jest.fn(() => ({
    data: [BookResultMock]
  }))
}))

jest.mock('@shared/hooks/contexts/useBook', () => ({
  useBook: jest.fn(() => ({
    selectedBook: BookResultMock
  }))
}))

jest.mock('../controller', () => ({
  useBookController: jest.fn(() => ({
    setIsCharactersCardHovered: jest.fn(),
    isCharactersCardHovered: false
  }))
}))

const renderComponent = () => render(<BookInformationCardInfo />)

describe('BookInformationCardInfo.test', () => {
  it('Should render correctly', () => {
    renderComponent()
  })

  it('Should render a link to published url', () => {
    renderComponent()

    const publishedUrlLink = screen.getByTestId('book-information-card-info-published-link')

    expect(publishedUrlLink.getAttribute('href')).toBe(BookResultMock.publishedUrl)
    expect(publishedUrlLink.getAttribute('target')).toBe('_blank')
  })

  it('Should render correctly infos', () => {
    renderComponent()

    const hitsLabel = screen.getByText(/acessos/i)
    const hits = screen.getByText('350')

    expect(hitsLabel.firstChild?.textContent).toBe('Acessos')
    expect(hits.firstChild?.textContent).toBe('350')
  })
})
