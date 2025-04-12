import { inMemoryGoalsRepository } from 'src/repositories/inMemory/inMemoryGoalsRepository'
import { CreateGoalsService, TCreateGoalsRequest } from 'src/services/goalsServices/create'
import { mockGoal } from '~/src/shared/mocks'
import { throwGoalsMessages } from '@utils'

describe('CreateGoalsService', () => {
  const { createGoals } = inMemoryGoalsRepository()

  const action: TCreateGoalsRequest['action'] = { createGoals }

  it('should throw exception about goals not found', async () => {
    const sut = CreateGoalsService({
      action,
      userId: '',
      goals: {
        goal: {
          goal: mockGoal.goal,
          goalComplete: mockGoal.goalComplete,
          goalCompletePercent: mockGoal.goalCompletePercent,
          words: mockGoal.words
        }
      }
    })

    expect(sut).rejects.toThrow(throwGoalsMessages.goalNotFound)
  })

  it('should be able to create a goals', async () => {
    const sut = await CreateGoalsService({
      action,
      userId: mockGoal.userId,
      goals: {
        goal: {
          goal: mockGoal.goal,
          goalComplete: mockGoal.goalComplete,
          goalCompletePercent: mockGoal.goalCompletePercent,
          words: mockGoal.words
        }
      }
    })

    expect(sut.words).toEqual(mockGoal.words)
  })
})
