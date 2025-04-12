import { IGoalRepository } from '@repositories'
import { TUpdateGoalSchemaResponse, TUpdateGoalSchemaRequest } from '@schemas'
import { throwGoalsMessages } from '@utils'

export type TUpdateGoalRequest = {
  actions: Pick<IGoalRepository, 'getGoalsByFilter' | 'updateGoal'>
  userId: string
  updatedGoal: TUpdateGoalSchemaRequest['updatedGoal']
}

type TUpdateGoalResponse = TUpdateGoalSchemaResponse

export const UpdateGoalService = async ({
  actions,
  userId,
  updatedGoal
}: TUpdateGoalRequest): Promise<TUpdateGoalResponse> => {
  const { getGoalsByFilter, updateGoal } = actions

  const startGoalFilter = new Date(updatedGoal.createdAt)
  const endGoalFilter = new Date(updatedGoal.createdAt)

  const existentGoal = await getGoalsByFilter(userId, startGoalFilter, endGoalFilter)

  if (!existentGoal.length) throw new Error(throwGoalsMessages.goalNotFound)

  const goalUpdated = await updateGoal(userId, updatedGoal.words, updatedGoal.goal)

  return goalUpdated
}
