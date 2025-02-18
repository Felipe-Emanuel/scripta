import { mockGoal } from '@entities/Goals/mocks'
import { inMemoryGoalsRepository } from '@repositories'
import {
  CreateGoalsService,
  TCreateGoalsRequest,
  GetGoalsByFilterService,
  TGetGoalsByFilterServiceRequest
} from '@services'

describe('GetGoalsByFilterService', () => {
  const { getGoalsByFilter, createGoals } = inMemoryGoalsRepository()

  const actions: TGetGoalsByFilterServiceRequest['actions'] = {
    getGoalsByFilter
  }

  const createGoalActions: TCreateGoalsRequest['action'] = {
    createGoals
  }

  const { email } = mockGoal

  const startGoalFilter = mockGoal.createdAt
  const endGoalFilter = mockGoal.createdAt

  it('should not broken and return a empty array', async () => {
    const sut = await GetGoalsByFilterService({
      actions,
      email,
      startGoalFilter,
      endGoalFilter
    })

    expect(sut).toEqual([])
  })

  it('should return a existent goal', async () => {
    const newGoal = await CreateGoalsService({
      action: createGoalActions,
      email,
      goals: {
        goal: {
          goal: mockGoal.goal,
          goalComplete: mockGoal.goalComplete,
          goalCompletePercent: mockGoal.goalCompletePercent,
          words: mockGoal.words
        },
        email: mockGoal.email
      }
    })

    const { createdAt, email: newEmail, goalComplete } = newGoal[0]

    const sut = await GetGoalsByFilterService({
      actions,
      email: newEmail,
      startGoalFilter: createdAt,
      endGoalFilter: createdAt
    })

    expect(sut[0].goalComplete).toEqual(goalComplete)
  })
})
