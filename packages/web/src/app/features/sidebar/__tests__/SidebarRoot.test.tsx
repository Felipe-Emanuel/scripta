import { render, screen, waitFor } from '@testing-library/react'
import { SidebarRoot } from '../views/SidebarRoot'
import userEvent from '@testing-library/user-event'

const isOpen = false
const toggleSidebar = jest.fn()

const mockedContent = 'mocked content'

const renderComponent = () =>
  render(
    <SidebarRoot isOpen={isOpen} toggleSidebar={toggleSidebar}>
      <p>{mockedContent}</p>
    </SidebarRoot>
  )

describe('SidebarRoot', () => {
  it('Should render correctly', () => {
    renderComponent()

    const content = screen.getByText(mockedContent)

    expect(content.firstChild?.textContent).toBe('mocked content')
  })

  it('Should toggle isOpen', async () => {
    renderComponent()

    const aside = screen.getByRole('complementary')

    await userEvent.hover(aside)

    await waitFor(() => {
      expect(toggleSidebar).toHaveBeenCalled()
    })
  })
})
