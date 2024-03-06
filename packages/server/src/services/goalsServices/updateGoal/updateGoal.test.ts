import { mockGoals } from 'src/entities/Goals/mocks/mockGoals'
import { throwGoalsMessages } from 'src/entities/Goals/utils'
import { inMemoryGoalsRepository } from 'src/repositories/inMemory/inMemoryGoalsRepository'
import {
  PatchGoalService,
  TPatchGoalServiceRequest,
} from 'src/services/goalsServices/updateGoal/updateGoal'

describe('PatchGoalService', () => {
  const { patchGoalComplete } = inMemoryGoalsRepository()

  const action: TPatchGoalServiceRequest['action'] = {
    patchGoalComplete,
  }

  const { goalCompletePercent } = mockGoals

  it('should throw exception about goal missing id', () => {
    const sut = PatchGoalService({
      action,
      goalCompletePercent,
      id: '',
    })

    expect(sut).rejects.toThrow(throwGoalsMessages.missingGoalId)
  })

  it('should throw exception about insufficient goal complete percent', () => {
    const sut = PatchGoalService({
      action,
      goalCompletePercent: 10,
      id: 'anyExistentGoal',
    })

    expect(sut).rejects.toThrow(
      throwGoalsMessages.insufficientGoalCompletePercent,
    )
  })

  it('should be able to patch goal complete percent to true', async () => {
    const sut = await PatchGoalService({
      action,
      goalCompletePercent,
      id: 'anyExistentGoal',
    })

    expect(sut.goalComplete).toEqual(true)
  })
})
