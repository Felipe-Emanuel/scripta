import { render, screen } from '@testing-library/react'
import { BookInformationHeader } from '../views/BookInformationHeader'
import { BookResultMock } from '@shared/mocks/BookResult'

jest.mock('@shared/hooks/contexts/useBook', () => ({
  useBook: jest.fn(() => ({
    selectedBook: BookResultMock
  }))
}))

jest.mock('@shared/hooks/useUser', () => ({
  useUser: jest.fn(() => ({
    sessionCustomer: {
      name: 'John Doe'
    }
  }))
}))

const renderComponent = () => render(<BookInformationHeader />)

describe('BookInformationHeader', () => {
  it('Should render correctly', () => {
    renderComponent()
  })

  it('Should render correctly properties', () => {
    renderComponent()

    const title = screen.getByText(/A Nice Title/i)
    const gender = screen.getByText(/Love/i)
    const theme = screen.getByText(/Oldschool/i)
    const description = screen.getByText(/lorem ipsum/i)

    expect(title.firstChild?.textContent).toBe('A Nice Title')
    expect(gender.firstChild?.textContent).toBe('Love /')
    expect(theme.firstChild?.textContent).toBe('Oldschool')
    expect(description.firstChild?.textContent).toBe('lorem ipsum...')
  })

  it('Should render welcome', async () => {
    renderComponent()

    const welcome = await screen.findByText(/john doe/i)

    expect(welcome.firstChild?.textContent).toBe(
      'Olá, John Doe, as informações do seu livro estão prontas!'
    )
  })

  it('Should render correctly chips', () => {
    renderComponent()

    const concluedChip = screen.getByText(/concluído/i)
    const publicChip = screen.getByText(/público/i)

    expect(concluedChip).toBeTruthy()
    expect(publicChip).toBeTruthy()
  })

  it('Should not render conclued chip', async () => {
    BookResultMock.conclued = false
    renderComponent()

    const chips = await screen.findAllByTestId('book-incofmation-header-chip')

    expect(chips).toHaveLength(1)
  })

  it('Should render desactive chip', () => {
    BookResultMock.isActive = false
    renderComponent()

    const publicChip = screen.getByText(/oculto/i)

    expect(publicChip.firstChild?.textContent).toBe('Oculto')
  })
})
