import { inMemoryGoalsRepository } from '@repositories'
import { GetLastGoalService, TGetLastGoalRequest } from '@services'
import { chapterMock, mockGoal } from '~/src/shared/mocks'

describe('GetLastGoalService', () => {
  const { getLastGoal, createGoals, updateGoal } = inMemoryGoalsRepository()

  const action: TGetLastGoalRequest['action'] = {
    getLastGoal,
    updateGoal
  }

  it('should return null', () => {
    const sut = GetLastGoalService({
      action,
      userId: 'unexpected userId',
      chapters: [chapterMock]
    })

    expect(sut).resolves.toBeNull()
  })

  it('should be able to return a existent goal', async () => {
    await createGoals(mockGoal)

    const sut = await GetLastGoalService({
      action,
      userId: mockGoal.userId,
      chapters: [chapterMock]
    })

    expect(sut.goal).toEqual(mockGoal.goal)
  })
})
