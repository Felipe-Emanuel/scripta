import { render, screen, waitFor } from '@testing-library/react'
import { FeedbackRoot } from '../views/FeedbackRoot'
import * as useSidebarModule from '@shared/hooks/contexts/useSidebar'

const useSidebarProperties = {
  isFeedbackOnFocus: true,
  isDragActive: false,
  image: 'a fake base 64',
  toggleFeedbackFocused: jest.fn(),
  getRootProps: jest.fn(),
  clearimage: jest.fn(),
  setChangeImageAlert: jest.fn(),
  onPaste: jest.fn()
}

jest.mock('@shared/hooks/contexts/useSidebar', () => ({
  useSidebar: jest.fn(() => ({
    ...useSidebarProperties,
    changeImageAlert: false
  }))
}))

const useSidebarSpy = jest.spyOn(useSidebarModule, 'useSidebar')

const renderComponent = () => render(<FeedbackRoot />)

describe('FeedbackRoot', () => {
  it('Should render correctly', () => {
    renderComponent()
  })

  it('Should render modal if changeImageAlert is true', async () => {
    // @ts-expect-error falta propriedades da qual não irei usar neste teste
    useSidebarSpy.mockReturnValueOnce({
      changeImageAlert: true,
      ...useSidebarProperties
    })

    renderComponent()

    const warningModal = await screen.findByTestId('warning-clear-feedback-image-modal')

    await waitFor(() => {
      expect(warningModal).toBeTruthy()
    })
  })
})
