import { render, fireEvent } from '@testing-library/react'
import { FeedbackAction } from '../views/FeedbackAction'
import { TCreateFeedbackRequest } from '@shared/types'

type TInputElementMocked = Element & { files: File[] }

const type: Set<string> = new Set(['bug'])

const mockedCreateFeedbackRequest: TCreateFeedbackRequest = {
  feedback: {
    feedback: 'anything',
    screenshot: '',
    type: 'bug',
    userEmail: 'foo@app.com'
  }
}

const useSidebarProperties = {
  type,
  firstValue: 'bug',
  feedback: 'anything',
  isDisabled: true,
  createFeedbackRequest: mockedCreateFeedbackRequest,
  handleSelectionChange: jest.fn(),
  setFeedback: jest.fn(),
  handleFileChange: jest.fn(),
  clearAll: jest.fn()
}

jest.mock('@shared/hooks/contexts/useSidebar', () => ({
  useSidebar: jest.fn(() => ({
    ...useSidebarProperties,
    changeImageAlert: false
  }))
}))

const renderComponent = () => render(<FeedbackAction />)

describe('FeedbackAction', () => {
  it('Should render correctly', () => {
    renderComponent()
  })

  it('Should select a file from input file', async () => {
    const { container } = renderComponent()

    const input = container.querySelector('div > div > div:nth-child(2) > div:nth-child(2) > input')

    if (input) {
      const file = new File(['(⌐□_□)'], 'test.png', { type: 'image/png' })
      fireEvent.change(input, { target: { files: [file] } })

      expect((input as TInputElementMocked).files[0]).toBe(file)
    }
  })
})
