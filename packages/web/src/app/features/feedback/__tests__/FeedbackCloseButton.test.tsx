import { render, screen, waitFor } from '@testing-library/react'
import { FeedbackCloseButton } from '../views/FeedbackCloseButton'
import user from '@testing-library/user-event'

const closeFeedbackFocused = jest.fn()

jest.mock('@shared/hooks/contexts/useSidebar', () => ({
  useSidebar: jest.fn(() => ({
    closeFeedbackFocused
  }))
}))

const renderComponent = () => render(<FeedbackCloseButton />)

describe('FeedbackCloseButton', () => {
  it('Should render correctly', () => {
    renderComponent()
  })

  it('Should render correctly', async () => {
    renderComponent()

    const closeButton = screen.getByTestId('close-feedback-button')
    await user.click(closeButton)

    await waitFor(() => {
      expect(closeFeedbackFocused).toHaveBeenCalled()
    })
  })
})
