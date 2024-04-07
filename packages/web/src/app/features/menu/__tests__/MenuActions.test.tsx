import { render, screen } from '@testing-library/react'
import { MenuActions } from '../views/MenuActions'
import { TMenuActions } from '@shared/types'
import { IoLogOut } from 'react-icons/io5'
import userEvent from '@testing-library/user-event'

const handleClick = jest.fn()

const actions: TMenuActions[] = [
  {
    handleClick,
    id: 0,
    isIconOnly: false,
    icon: IoLogOut,
    label: 'sair'
  },
  {
    handleClick,
    id: 0,
    isIconOnly: true,
    icon: IoLogOut,
    tooltipLabel: 'foo'
  }
]

jest.mock('../controller', () => ({
  useMenuController: jest.fn(() => ({
    actions,
    useRouter: jest.fn(() => ({
      push: jest.fn()
    }))
  }))
}))

jest.mock('next/navigation', () => ({
  usePathname: jest.fn().mockReturnValue('/'),
  useRouter: jest.fn(() => ({
    push: jest.fn()
  }))
}))

const renderComponent = () => render(<MenuActions />)

describe('MenuActions', () => {
  it('Should render correctly', () => {
    renderComponent()
  })

  it('Should render correctly all actions', () => {
    renderComponent()

    const actions = screen.getAllByRole('button')

    expect(actions).toHaveLength(2)
  })

  it('Should call action button when it is hit', async () => {
    renderComponent()

    const actions = screen.getAllByRole('button')

    await userEvent.click(actions[0])

    expect(handleClick).toHaveBeenCalled()
  })
})
