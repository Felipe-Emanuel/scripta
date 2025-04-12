import { Goal } from '@prisma/client'
import { IGoalRepository } from '@repositories'
import { TGoalEntitie } from '@services'
import { TCreateGoalResponseSchema, TGetDailyProgressSchemaResponse } from '@schemas'
import { mockGoal } from '~/src/shared/mocks'

export const inMemoryGoalsRepository = (): IGoalRepository => {
  let userGoals: Goal[] = [mockGoal]

  const createGoals = async (goals: TGoalEntitie): Promise<TCreateGoalResponseSchema> => {
    userGoals = [
      ...userGoals,
      {
        ...userGoals[0],
        ...goals
      }
    ]

    return goals
  }

  const getGoalsByFilter = async (
    userId: string,
    startGoalFilter: Date,
    endGoalFilter: Date
  ): Promise<TCreateGoalResponseSchema[]> => {
    const existentGoals = userGoals.filter(
      (goal) =>
        goal.userId === userId &&
        goal.createdAt.toISOString() === startGoalFilter.toISOString() &&
        goal.createdAt.toISOString() === endGoalFilter.toISOString()
    )

    return existentGoals || []
  }

  const updateGoal = async (
    userId: string,
    newWords: number,
    goal = 500
  ): Promise<TCreateGoalResponseSchema> => {
    const goalByUserId = userGoals.find((goal) => goal.userId === userId)

    const updatedGoal: Goal = {
      ...goalByUserId,
      words: goalByUserId.words + newWords,
      goal
    }

    return { ...goalByUserId, ...updatedGoal }
  }

  const getLastGoal = async (userId: string): Promise<TGetDailyProgressSchemaResponse | null> =>
    userGoals.find((goals) => goals.userId === userId) || null

  return {
    createGoals,
    getGoalsByFilter,
    updateGoal,
    getLastGoal
  }
}
