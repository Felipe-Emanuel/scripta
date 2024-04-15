import { render, screen, waitFor } from '@testing-library/react'
import RenderInfo from '../views/components/RenderInfo'
import { FaBook } from 'react-icons/fa'
import userEvent from '@testing-library/user-event'

const renderComponent = () => render(<RenderInfo icon={FaBook} label="fake label" qtd={10000} />)

describe('RenderInfo', () => {
  it('Should render correctly', () => {
    renderComponent()
  })

  it('Should render correctly label and qtd', () => {
    renderComponent()

    const label = screen.getByText(/fake label/i)
    const qtd = screen.getByText(/10.0k/i)

    expect(label.firstChild?.textContent).toBe('Fake Label')
    expect(qtd.firstChild?.textContent).toBe('10.0k')
  })

  it('Should render a link and call clearing function', async () => {
    const clearing = jest.fn()

    const sut = render(
      <RenderInfo
        icon={FaBook}
        label="fake label"
        qtd={10000}
        path="fake-path"
        clearing={clearing}
      />
    )

    const { findByTestId } = sut

    screen.logTestingPlaygroundURL()

    const link = await findByTestId('render-info-link')

    await userEvent.click(link)

    await waitFor(() => {
      expect(link.getAttribute('href')).toBe('fake-path')
      expect(clearing).toHaveBeenCalled()
    })
  })
})
