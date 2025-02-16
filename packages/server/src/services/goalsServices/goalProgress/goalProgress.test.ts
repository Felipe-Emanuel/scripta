import { inMemoryGoalsRepository } from '~/src/repositories'
import { GoalProgressService, TGoalProgressServiceRequest } from '.'
import { mockGoal } from '~/src/entities/Goals/mocks'
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
      goals: mockGoal
    })

    const sut = await GoalProgressService({
      action,
      userEmail: mockGoal.email
    })

    expect(sut.goalCompletePercent).toBe(80)
  })
})
