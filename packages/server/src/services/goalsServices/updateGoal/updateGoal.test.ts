import { inMemoryGoalsRepository } from '@repositories'
import {
  CreateGoalsService,
  TCreateGoalsRequest,
  TUpdateGoalRequest,
  UpdateGoalService
} from '@services'
import { mockGoal, userEntitieMock } from '~/src/shared/mocks'
import { throwGoalsMessages } from '@utils'

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
      userId: undefined,
      updatedGoal: {
        ...mockGoal,
        createdAt: mockGoal.createdAt.toISOString()
      }
    })

    expect(sut).rejects.toThrow(throwGoalsMessages.goalNotFound)
  })

  it('should update a existent goal', async () => {
    const existentGoal = await CreateGoalsService({
      action: createGoalsAction,
      userId: userEntitieMock.id,
      goals: {
        goal: {
          ...mockGoal
        }
      }
    })

    const sut = await UpdateGoalService({
      actions,
      userId: mockGoal.userId,
      updatedGoal: {
        ...existentGoal,
        createdAt: mockGoal.createdAt.toISOString(),
        words: 2500
      }
    })

    expect(sut.goalCompletePercent).toEqual(80)
    expect(sut.goalComplete).toEqual(false)
  })
})
