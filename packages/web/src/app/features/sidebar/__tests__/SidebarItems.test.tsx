import { render, screen } from '@testing-library/react'
import { SidebarItems } from '../views/SidebarItems'

const renderComponent = () => render(<SidebarItems isOpen />)

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
