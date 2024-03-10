import { mockGoal } from '@entities/Goals/mocks'
import { inMemoryGoalsRepository } from '@repositories'
import { InsertGoalService, TInsertGoalServiceRequest } from '@services'

describe('InsertGoalService', () => {
  const { getGoalsByFilter, createGoals } = inMemoryGoalsRepository()

  const actions: TInsertGoalServiceRequest['actions'] = {
    getGoalsByFilter,
    createGoals,
  }

  const startGoalFilter = mockGoal.createdAt
  const endGoalFilter = mockGoal.createdAt

  it('should be able to insert a new goal in a existent goals list', async () => {
    const sut = await InsertGoalService({
      actions,
      endGoalFilter,
      startGoalFilter,
      newGoal: mockGoal,
    })

    expect(sut.email).toEqual(mockGoal.email)
  })
})
