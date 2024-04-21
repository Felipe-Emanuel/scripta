import { render, screen } from '@testing-library/react'
import { NewBookProgressBar } from '../views/NewBookProgressBar'
import { TNewBookFormState } from '@shared/types'

const stage: TNewBookFormState['state'] = 'OVERVIEW'

const renderComponent = () => render(<NewBookProgressBar stage={stage} />)

describe('NewBookProgressBar', () => {
  it('Should render correctly', () => {
    renderComponent()
  })

  it(`Should render all four states progress pointers`, () => {
    renderComponent()

    const pointers = screen.getAllByTestId('new-book-progress-pointer')

    expect(pointers.length).toBe(4)
  })

  it('Should increase correctly pointer size', () => {
    renderComponent()

    const overviewPointer = screen.getByTestId(`pointer-${stage}`)

    expect(overviewPointer.classList).toContain('size-6')
  })
})
