import { mockGoals } from 'src/entities/Goals/mocks/mockGoals'
import { throwGoalsMessages } from 'src/entities/Goals/utils'
import { inMemoryGoalsRepository } from 'src/repositories/inMemory/inMemoryGoalsRepository'
import {
  CreateGoalsService,
  TCreateGoalsRequest,
} from 'src/services/goalsServices/create/CreateGoals'

describe('CreateGoalsService', () => {
  const { createGoals } = inMemoryGoalsRepository()

  const action: TCreateGoalsRequest['action'] = { createGoals }

  it('should throw exception about goals not found', () => {
    const sut = CreateGoalsService({
      action,
      email: 'unexistent user email',
      goals: mockGoals,
    })

    expect(sut).rejects.toThrow(throwGoalsMessages.goalNotFound)
  })

  it('should be able to create a goals', async () => {
    const sut = await CreateGoalsService({
      action,
      email: mockGoals.email,
      goals: mockGoals,
    })

    expect(sut[0].week).toEqual(mockGoals.week)
  })
})
