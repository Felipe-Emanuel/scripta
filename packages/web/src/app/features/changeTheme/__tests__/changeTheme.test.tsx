import { ChangeTheme } from '@features/changeTheme'
import { render } from '@testing-library/react'

describe('ChangeTheme', () => {
  it('should render with default theme', () => {
    const { container } = render(
      <ChangeTheme.root>
        <ChangeTheme.icon />
      </ChangeTheme.root>,
    )

    expect(container).toBeTruthy()
  })
})
