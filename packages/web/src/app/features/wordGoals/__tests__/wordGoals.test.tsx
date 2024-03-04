import { WordGoals } from '@features/wordGoals'
import { TRootComponent } from '@shared/types'
import { render, waitFor } from '@testing-library/react'

jest.mock(
  'lottie-react',
  jest.fn(() => ({
    useLottie: jest.fn(() => ({
      View: <span></span>,
    })),
  })),
)

jest.mock('react-hook-form', () => ({
  useFormContext: jest.fn(() => ({
    register: jest.fn(() => ({
      name: 'wordGoals',
      options: {},
    })),
  })),
  FormProvider: ({ children }: TRootComponent) => <>{children}</>,
}))

jest.mock(
  '@features/wordGoals/controller',
  jest.fn(() => ({
    useWordGoalsController: jest.fn(() => ({
      goal: 500,
      words: 250,
      visibleState: true,
      wordGoalsSchema: jest.fn(() => ({
        wordGoals: 500,
      })),
      toggleFormVisible: jest.fn(),
      handleSubmit: jest.fn((onSubmit) => onSubmit),
      onSubmit: jest.fn(() => ({
        wordGoals: 500,
      })),
    })),
  })),
)

describe('wordGoals', () => {
  const sut = (
    <WordGoals.root>
      <WordGoals.wrapper>
        <WordGoals.info />
      </WordGoals.wrapper>
    </WordGoals.root>
  )

  it('should render correctly', () => {
    const { container } = render(sut)

    expect(container).toBeTruthy()
  })

  it('should render button and form', async () => {
    const { findByTestId, findByRole } = render(sut)
    const button = await findByRole('button')
    const form = await findByTestId('form-meta')

    await waitFor(() => {
      expect(form).not.toBeNull()
      expect(button).not.toBeNull()
    })
  })
})
