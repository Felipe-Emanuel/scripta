import { mockGoal } from '@entities/Goals/mocks'
import { inMemoryGoalsRepository } from '@repositories'
import {
  GetLastGoalService,
  TGetLastGoalRequest,
} from 'src/services/goalsServices/getLastGoal'

describe('GetLastGoalService', () => {
  const { getLastGoal, createGoals } = inMemoryGoalsRepository()

  const action: TGetLastGoalRequest['action'] = {
    getLastGoal,
  }

  it('should return null', () => {
    const sut = GetLastGoalService({
      action,
      email: mockGoal.email,
    })

    expect(sut).resolves.toBeNull()
  })

  it('should be able to return a existent goal', async () => {
    await createGoals(mockGoal)

    const sut = await GetLastGoalService({
      action,
      email: mockGoal.email,
    })

    expect(sut.goal).toEqual(mockGoal.goal)
  })
})
