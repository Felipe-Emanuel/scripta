import { render, screen } from '@testing-library/react'
import { MenuPathname } from '../views/MenuPathname'

jest.mock('next/navigation', () => jest.requireActual('next-router-mock'))
jest.mock('next/navigation', () => ({
  usePathname: jest.fn().mockReturnValue('/')
}))

const renderComponent = () => render(<MenuPathname />)

describe('MenuPathname', () => {
  it('Should render correctly', () => {
    renderComponent()
  })

  it('Should render correctly menu pathname after navigation', () => {
    renderComponent()

    const pathnameLabel = screen.getByText(/\/ novidades/i)

    expect(pathnameLabel).toBeTruthy()
  })
})
