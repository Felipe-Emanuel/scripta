import { Profile } from '@features/profile'
import { TRootComponent, TSessionCustomer } from '@shared/types'
import { render } from '@testing-library/react'

jest.mock('react-hook-form', () => ({
  useFormContext: jest.fn(() => ({
    register: jest.fn(() => ({
      name: 'wordGoals',
      options: {}
    }))
  })),
  FormProvider: ({ children }: TRootComponent) => <>{children}</>
}))

jest.mock(
  '@features/profile/controller',
  jest.fn(() => ({
    useProfileController: jest.fn(() => ({
      userName: 'John',
      wordsCountText: '500',
      wordCountersLoading: false,
      visibleState: true,
      sessionCustomer: {} as TSessionCustomer,
      currentGoal: true,
      wordCountSchema: jest.fn(() => ({
        wordCount: 500
      })),
      toggleFormVisible: jest.fn(),
      handleSubmit: jest.fn((onSubmit) => onSubmit),
      onSubmit: jest.fn(() => ({
        wordCount: 500
      }))
    }))
  }))
)

describe('profile', () => {
  const sut = (
    <Profile.root>
      <Profile.hero />
      <Profile.info />
    </Profile.root>
  )

  const { container } = render(sut)

  it('should render correctly', () => {
    expect(container).toBeTruthy()
  })

  it('should render correctly infos', async () => {
    const { findByTestId } = render(sut)
    const name = await findByTestId('profile-name')
    const wordsCountText = await findByTestId('words-count-text')

    expect(name.firstChild?.textContent).toBe('John')
    expect(wordsCountText.firstChild?.textContent).toBe('500')
  })
})
