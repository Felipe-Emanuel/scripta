import { mockGoal } from '@entities/Goals/mocks'
import { throwGoalsMessages } from '@entities/Goals/utils'
import { inMemoryGoalsRepository } from '@repositories'
import {
  CreateGoalsService,
  TCreateGoalsRequest,
  TUpdateGoalRequest,
  UpdateGoalService
} from '@services'

describe('UpdateGoalService', () => {
  const { getGoalsByFilter, updateGoal, createGoals } = inMemoryGoalsRepository()

  const actions: TUpdateGoalRequest['actions'] = {
    getGoalsByFilter,
    updateGoal
  }

  const createGoalsAction: TCreateGoalsRequest['action'] = {
    createGoals
  }

  it('should throw excpetion about goal not found', () => {
    const sut = UpdateGoalService({
      actions,
      updatedGoal: mockGoal
    })

    expect(sut).rejects.toThrow(throwGoalsMessages.goalNotFound)
  })

  it('should update a existent goal', async () => {
    const existentGoal = await CreateGoalsService({
      action: createGoalsAction,
      email: mockGoal.email,
      goals: mockGoal
    })

    const sut = await UpdateGoalService({
      actions,
      updatedGoal: {
        ...existentGoal[0],
        words: 2500
      }
    })

    expect(sut.goalCompletePercent).toEqual(80)
    expect(sut.goalComplete).toEqual(false)
  })
})
