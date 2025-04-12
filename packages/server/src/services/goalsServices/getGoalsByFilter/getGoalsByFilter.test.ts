import { inMemoryGoalsRepository } from '@repositories'
import { GetGoalsByFilterService, TGetGoalsByFilterServiceRequest } from '@services'
import { throwGoalsMessages } from '@utils'
import { mockGoal, userEntitieMock } from '~/src/shared/mocks'

describe('GetGoalsByFilterService', () => {
  const { getGoalsByFilter, createGoals } = inMemoryGoalsRepository()

  const action: TGetGoalsByFilterServiceRequest['actions'] = {
    getGoalsByFilter
  }

  const startDate = new Date()
  const endDate = new Date()

  beforeEach(async () => {
    await createGoals(mockGoal)
  })

  it('should throw if userId is missing', async () => {
    const sut = GetGoalsByFilterService({
      actions: action,
      userId: '',
      startGoalFilter: startDate,
      endGoalFilter: endDate
    })

    await expect(sut).rejects.toThrow(throwGoalsMessages.missingGoaluserId)
  })

  it('should return empty array if no goals match the filter', async () => {
    const sut = await GetGoalsByFilterService({
      actions: action,
      userId: 'wrong-id',
      startGoalFilter: startDate,
      endGoalFilter: endDate
    })

    expect(sut).toEqual([])
  })

  it('should return goals that match goalComplete and date range', async () => {
    const sut = await GetGoalsByFilterService({
      actions: action,
      userId: userEntitieMock.id,
      startGoalFilter: mockGoal.createdAt,
      endGoalFilter: mockGoal.createdAt
    })

    expect(sut).not.toHaveLength(0)
    expect(sut[0].goalComplete).toBe(mockGoal.goalComplete)
  })
})
