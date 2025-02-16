import { render, renderHook, screen, waitFor } from '@testing-library/react'
import { FeedbackScreenshot } from '../views/FeedbackScreenshot'
import * as useSidebarModule from '@shared/hooks/contexts/useSidebar'
import user from '@testing-library/user-event'
import { useDisclosure } from '@heroui/react'

const clearImage = jest.fn()

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
    const { result } = renderHook(useDisclosure)

    const { onOpen } = result.current

    const thumb = screen.getByTestId('feedback-thumb')
    await user.click(thumb)

    await waitFor(() => expect(onOpen).toHaveBeenCalled())
  })
})
