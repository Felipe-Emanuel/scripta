import { ChangeTheme } from '@features/changeTheme'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import * as useThemeModule from '@shared/hooks/contexts/useTheme'

jest.mock('@shared/hooks/contexts/useTheme', () => ({
  useTheme: jest.fn(() => ({
    isSystem: false,
    theme: 'light',
  })),
}))

describe('ChangeTheme', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  const sut = (
    <ChangeTheme.root>
      <ChangeTheme.icon />
    </ChangeTheme.root>
  )

  it('should be able to render', () => {
    const { getByTestId } = render(sut)

    const icon = getByTestId('testid=light')
    expect(icon).toBeTruthy()
  })

  it('should be able to render system theme', () => {
    jest.spyOn(useThemeModule, 'useTheme').mockImplementation(() => ({
      isSystem: true,
      theme: 'light',
      changeTheme: jest.fn(),
    }))

    const { getByTestId } = render(sut)

    const icon = getByTestId('testid=system')
    expect(icon).toBeTruthy()
  })

  it('should update theme when button is clicked', async () => {
    const mockOnClick = jest.fn()
    jest.spyOn(useThemeModule, 'useTheme').mockImplementation(() => ({
      isSystem: false,
      theme: 'light',
      changeTheme: mockOnClick,
    }))

    const user = userEvent.setup()
    const { getByTestId } = render(sut)

    const icon = getByTestId('testid=light')

    await user.click(icon)

    expect(mockOnClick).toHaveBeenCalled()
  })
})
