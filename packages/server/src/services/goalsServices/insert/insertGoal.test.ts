import { mockGoals } from 'src/entities/Goals/mocks/mockGoals'
import { throwGoalsMessages } from 'src/entities/Goals/utils'
import { inMemoryGoalsRepository } from 'src/repositories/inMemory/inMemoryGoalsRepository'
import {
  CreateGoalsService,
  TCreateGoalsRequest,
} from 'src/services/goalsServices/create/CreateGoals'
import {
  InsertGoalService,
  TInsertGoalServiceRequest,
} from 'src/services/goalsServices/insert/insertGoal'

describe('InsertGoalService', () => {
  const today = new Date().getDate()
  const { getGoalsByFilter, createGoals } = inMemoryGoalsRepository()

  const actions: TInsertGoalServiceRequest['actions'] = {
    getGoalsByFilter,
    createGoals,
  }
  const createGoalActions: TCreateGoalsRequest['action'] = {
    createGoals,
  }

  const { email } = mockGoals

  it('should throw exception about goal not found', () => {
    const sut = InsertGoalService({
      actions,
      filter: 'week',
      newGoal: mockGoals,
    })

    expect(sut).rejects.toThrow(throwGoalsMessages.goalNotFound)
  })

  it('should throw exception about todays goal already exists', async () => {
    await CreateGoalsService({
      action: createGoalActions,
      email,
      goals: {
        ...mockGoals,
        day: today,
      },
    })

    const sut = InsertGoalService({
      actions,
      filter: 'week',
      newGoal: {
        ...mockGoals,
        day: today,
      },
    })

    expect(sut).rejects.toThrow(throwGoalsMessages.todaysGoalsAlreadyExists)
  })

  it('should be able to insert a new goal in a existent goals list', async () => {
    const sut = await InsertGoalService({
      actions,
      filter: 'week',
      newGoal: mockGoals,
      day: today + 2,
    })

    expect(sut.email).toEqual(mockGoals.email)
  })
})
