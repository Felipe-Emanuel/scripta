import { Graphics } from '@features/Graphics'
import { render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('Graphics', () => {
  const yearButtonLabel = 'Ano'
  const getMonthExpenses = jest.fn()
  const getYearExpenses = jest.fn()

  const sut = (
    <Graphics.root>
      <Graphics.header
        text="text-header"
        actions={
          <Graphics.actions
            getMonthExpenses={getMonthExpenses}
            getYearExpenses={getYearExpenses}
          />
        }
      />
    </Graphics.root>
  )
  const user = userEvent.setup()

  it('should render correctly', () => {
    const { container } = render(sut)

    expect(container).toBeTruthy()
  })

  it('should call getExpense callback in graphics actions', async () => {
    const { getByTestId } = render(sut)

    const yearAction = getByTestId(yearButtonLabel)

    await user.click(yearAction)

    await waitFor(() => {
      expect(getYearExpenses).toHaveBeenCalledTimes(1)
    })
  })
})
