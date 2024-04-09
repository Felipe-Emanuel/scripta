import { render, screen, waitFor } from '@testing-library/react'
import { FeedbackScreenshot } from '../views/FeedbackScreenshot'
import * as useSidebarModule from '@shared/hooks/contexts/useSidebar'
import user from '@testing-library/user-event'

const clearImage = jest.fn

jest.mock('@shared/hooks/contexts/useSidebar', () => ({
  useSidebar: jest.fn(() => ({
    image: '/fake-base-64',
    clearImage
  }))
}))

const useSidebarSpy = jest.spyOn(useSidebarModule, 'useSidebar')

const renderComponent = () => render(<FeedbackScreenshot />)

describe('FeedbackScreenshot', () => {
  it('Should render correctly', () => {
    renderComponent()
  })

  it('Should not broken with a empty image and return null', () => {
    // @ts-expect-error falta propriedades da qual não irei usar neste teste
    useSidebarSpy.mockReturnValueOnce({
      changeImageAlert: true,
      image: ''
    })

    const { container } = renderComponent()

    expect(container.firstChild).toBeNull()
  })

  it('Should open modal image when image is clicked', async () => {
    renderComponent()

    const thumb = screen.getByTestId('feedback-thumb')
    await user.click(thumb)

    await waitFor(() => {
      const thumbModal = screen.getByTestId('feedback-thumb-modal')
      expect(thumbModal).toBeTruthy()
    })
  })
})
