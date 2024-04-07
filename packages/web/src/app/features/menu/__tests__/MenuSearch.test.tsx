import { render, screen, waitFor } from '@testing-library/react'
import { MenuSearch } from '../views/MenuSearch'
import { menuSearchDefaultItem } from '@features/dashboard/DashboardUtils'
import user from '@testing-library/user-event'

const goTo = {
  x: 20,
  y: 20
}

const updateRef = jest.fn()

jest.mock('../controller', () => ({
  useMenuController: jest.fn(() => ({
    goTo,
    ref: '',
    updateRef,
    clearHelper: jest.fn(),
    useRouter: jest.fn(() => ({
      push: jest.fn()
    }))
  }))
}))

const renderComponent = () => render(<MenuSearch defaultItems={menuSearchDefaultItem} />)

describe('MenuSearch', () => {
  it('Should Should render correctly', () => {
    renderComponent()
  })

  it('Should update the ref', async () => {
    renderComponent()

    const helpSearch = screen.getByRole('combobox', {
      name: /busca por ajuda/i
    })

    await user.click(helpSearch)
    const perfilOption = await screen.findByText(/perfil/i)
    await user.click(perfilOption)

    await waitFor(() => {
      expect(updateRef).toHaveBeenCalledWith(menuSearchDefaultItem[0].ref)
    })
  })
})
