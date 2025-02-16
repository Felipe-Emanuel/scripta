import { throwGoalsMessages } from '@entities/Goals/utils'
import { Goal } from '@prisma/client'
import { IGoalRepository } from '@repositories'

export type TUpdateGoalRequest = {
  actions: Pick<IGoalRepository, 'getGoalsByFilter' | 'updateGoal'>
  updatedGoal: Goal
}

type TUpdateGoalResponse = Goal

export const UpdateGoalService = async ({
  actions,
  updatedGoal
}: TUpdateGoalRequest): Promise<TUpdateGoalResponse> => {
  const { getGoalsByFilter, updateGoal } = actions

  const startGoalFilter = updatedGoal.createdAt
  const endGoalFilter = updatedGoal.createdAt

  const existentGoal = await getGoalsByFilter(updatedGoal.email, startGoalFilter, endGoalFilter)

  if (!existentGoal.length) throw new Error(throwGoalsMessages.goalNotFound)

  const goalUpdated = await updateGoal(updatedGoal.email, updatedGoal.words, updatedGoal.goal)

  return goalUpdated
}
