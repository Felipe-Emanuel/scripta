import { mockGoals } from 'src/entities/Goals/mocks/mockGoals'
import { inMemoryGoalsRepository } from 'src/repositories/inMemory/inMemoryGoalsRepository'
import {
  CreateGoalsService,
  TCreateGoalsRequest,
} from 'src/services/goalsServices/create/CreateGoals'
import {
  GetGoalsByFilterService,
  TGetGoalsByFilterServiceRequest,
} from 'src/services/goalsServices/getGoalsByFilter/getGoalsByFilter'

describe('GetGoalsByFilterService', () => {
  const { getGoalsByFilter, createGoals } = inMemoryGoalsRepository()

  const actions: TGetGoalsByFilterServiceRequest['actions'] = {
    getGoalsByFilter,
  }

  const createGoalActions: TCreateGoalsRequest['action'] = {
    createGoals,
  }

  const { email } = mockGoals

  it('should not broken and return a empty array', async () => {
    const sut = await GetGoalsByFilterService({
      actions,
      email,
      filter: 'month',
      filterValue: mockGoals.month,
    })

    expect(sut).toEqual([])
  })

  it('should return a existent goal', async () => {
    await CreateGoalsService({
      action: createGoalActions,
      email,
      goals: mockGoals,
    })

    const sut = await GetGoalsByFilterService({
      actions,
      email,
      filter: 'month',
      filterValue: mockGoals.month,
    })

    expect(sut[0].goalComplete).toEqual(mockGoals.goalComplete)
  })
})
