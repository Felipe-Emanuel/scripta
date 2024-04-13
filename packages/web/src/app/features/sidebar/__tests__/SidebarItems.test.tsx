import { render, screen } from '@testing-library/react'
import { SidebarItems } from '../views/SidebarItems'

jest.mock('next/navigation', () => ({
  usePathname: jest.fn().mockReturnValue('characters'),
  useParams: jest.fn().mockReturnValue({
    characters: ['characters', '123abc-bca321']
  })
}))

jest.mock('@shared/hooks/contexts/useSidebar', () => ({
  useSidebar: jest.fn(() => ({
    isFeedbackOnFocus: false,
    isOpen: false,
    getRootProps: jest.fn()
  }))
}))

const renderComponent = () => render(<SidebarItems />)

describe('SidebarItems', () => {
  it('Should render correctly', () => {
    renderComponent()
  })

  it('Should should render correctly sections', () => {
    renderComponent()

    const navegador = screen.getByRole('heading', {
      name: /navegador/i
    })
    const you = screen.getByRole('heading', {
      name: /você/i
    })

    expect(navegador.firstChild?.textContent).toBe('Navegador')
    expect(you.firstChild?.textContent).toBe('Você')
  })

  it('Should pass correctly href param', async () => {
    renderComponent()

    const dashboardLink = document.querySelector('div > section:nth-child(2) > a:nth-child(2)')

    const href = dashboardLink?.getAttribute('href')
    expect(href).toBe('/dashboard')
  })
})
