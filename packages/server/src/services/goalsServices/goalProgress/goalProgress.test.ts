import { inMemoryGoalsRepository } from '@repositories'
import { GoalProgressService, TGoalProgressServiceRequest } from '.'
import { CreateGoalsService, TCreateGoalsRequest } from '../create'
import { mockGoal } from '~/src/shared/mocks'

describe('GoalProgressService', () => {
  const { getLastGoal, createGoals } = inMemoryGoalsRepository()

  const action: TGoalProgressServiceRequest['action'] = {
    getLastGoal
  }
  const createGoalAction: TCreateGoalsRequest['action'] = {
    createGoals
  }

  it('should return the daily goal progress', async () => {
    await CreateGoalsService({
      action: createGoalAction,
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

    const sut = await GoalProgressService({
      action,
      userId: mockGoal.userId
    })

    expect(sut.goalCompletePercent).toBe(80)
  })
})
