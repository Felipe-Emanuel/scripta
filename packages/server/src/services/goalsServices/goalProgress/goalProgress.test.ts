import { inMemoryGoalsRepository } from '@repositories'
import { GoalProgressService, TGoalProgressServiceRequest } from '.'
import { mockGoal } from '@entities/Goals/mocks'
import { CreateGoalsService, TCreateGoalsRequest } from '../create'

describe('GoalProgressService', () => {
  const { getTodayGoalProgress, createGoals } = inMemoryGoalsRepository()

  const action: TGoalProgressServiceRequest['action'] = {
    getTodayGoalProgress
  }
  const createGoalAction: TCreateGoalsRequest['action'] = {
    createGoals
  }

  it('should return the daily goal progress', async () => {
    await CreateGoalsService({
      action: createGoalAction,
      email: mockGoal.email,
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

    const sut = await GoalProgressService({
      action,
      userEmail: mockGoal.email
    })

    expect(sut.goalCompletePercent).toBe(80)
  })
})
