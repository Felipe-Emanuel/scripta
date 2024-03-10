import { Goal } from '@prisma/client'
import { IGoalRepository } from '@repositories'

export type TGetLastGoalRequest = {
  action: Pick<IGoalRepository, 'getLastGoal'>
  email: string
}

type TGetLastGoalResponse = Goal

export const GetLastGoalService = async ({
  action,
  email,
}: TGetLastGoalRequest): Promise<TGetLastGoalResponse | null> => {
  const { getLastGoal } = action

  const existentGoal = await getLastGoal(email)

  return existentGoal || null
}
