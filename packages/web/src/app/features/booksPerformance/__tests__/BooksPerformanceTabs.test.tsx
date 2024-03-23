import { BooksPerformanceTabs } from '@features/booksPerformance/views/BooksPerformanceTabs'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { act } from 'react-dom/test-utils'
import { TTab } from '@shared/types'
import { IoIosCloudDone } from 'react-icons/io'

describe('BooksPerformanceTabs', () => {
  const handleFilter = jest.fn()
  const tabs: TTab[] = [
    {
      amount: 1,
      icon: IoIosCloudDone,
      id: 0,
      label: 'FakeLabel',
      value: 'Theme',
    },
  ]
  const sut = (
    <BooksPerformanceTabs handleTabFilter={handleFilter} tabs={tabs} />
  )
  const { findByTestId } = render(sut)

  it('should render correctly', async () => {
    const tablist = await findByTestId('tablist')

    expect(tablist).toBeTruthy()
  })

  it('should change active tab when click', async () => {
    render(sut)

    const tab = screen.getByRole('tab', {
      name: /fakelabel 1/i,
    })
    screen.logTestingPlaygroundURL()

    act(() => {
      userEvent.click(tab)
    })

    await waitFor(() => {
      expect(tab.getAttribute('aria-selected')).toBe('true')
    })
  })
})
