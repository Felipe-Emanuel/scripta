import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { act, PropsWithChildren } from 'react'
import { TTab } from '@shared/types'
import { IoIosCloudDone } from 'react-icons/io'
import BooksPerformanceTabs from '../views/BooksPerformanceTabs'

jest.mock('@heroui/react', () => ({
  Tabs: ({ children, ...props }: PropsWithChildren) => (
    <div role="tablist" {...props}>
      {children}
    </div>
  ),
  Tab: ({ children, title, ...props }: PropsWithChildren & { title: React.ReactNode }) => (
    <div role="tab" aria-selected="false" {...props}>
      {title}
      {children}
    </div>
  )
}))

describe('BooksPerformanceTabs', () => {
  const handleFilter = jest.fn()
  const tabs: TTab[] = [
    {
      amount: 1,
      icon: IoIosCloudDone,
      id: 0,
      label: 'FakeLabel',
      value: 'hits'
    }
  ]
  const sut = <BooksPerformanceTabs handleTabFilter={handleFilter} tabs={tabs} />
  const { findByTestId } = render(sut)

  it('should render correctly', async () => {
    const tablist = await findByTestId('tablist')

    expect(tablist).toBeTruthy()
  })

  it.skip('should change active tab when click', async () => {
    render(sut)

    const tab = screen.getByText(/FakeLabel/i)

    act(() => {
      userEvent.click(tab)
    })

    await waitFor(() => {
      expect(handleFilter).toHaveBeenCalledWith('hits')
    })
  })
})
