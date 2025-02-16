import { mockGoal } from '@entities/Goals/mocks'
import { inMemoryGoalsRepository } from '@repositories'
import { GetLastGoalService, TGetLastGoalRequest } from 'src/services/goalsServices/getLastGoal'
import { chapterMock } from '~/src/entities/Chapter/mocks'

describe('GetLastGoalService', () => {
  const { getLastGoal, createGoals, updateGoal } = inMemoryGoalsRepository()

  const action: TGetLastGoalRequest['action'] = {
    getLastGoal,
    updateGoal
  }

  it('should return null', () => {
    const sut = GetLastGoalService({
      action,
      paramUserEmail: mockGoal.email,
      chapters: [chapterMock]
    })

    expect(sut).resolves.toBeNull()
  })

  it('should be able to return a existent goal', async () => {
    await createGoals(mockGoal)

    const sut = await GetLastGoalService({
      action,
      paramUserEmail: mockGoal.email,
      chapters: [chapterMock]
    })

    expect(sut.goal).toEqual(mockGoal.goal)
  })
})
