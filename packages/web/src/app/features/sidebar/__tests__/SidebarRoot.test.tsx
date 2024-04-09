import { render, screen } from '@testing-library/react'
import { SidebarRoot } from '../views/SidebarRoot'

const mockedContent = 'mocked content'

const renderComponent = () =>
  render(
    <SidebarRoot>
      <p>{mockedContent}</p>
    </SidebarRoot>
  )

describe('SidebarRoot', () => {
  it('Should render correctly', () => {
    renderComponent()

    const content = screen.getByText(mockedContent)

    expect(content.firstChild?.textContent).toBe('mocked content')
  })
})
