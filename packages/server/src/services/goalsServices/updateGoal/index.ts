import { GoalsEntitie } from '@entities/Goals'
import { throwGoalsMessages } from '@entities/Goals/utils'
import { Goal } from '@prisma/client'
import { IGoalRepository } from '@repositories'
import { progressGoal } from '@utils'

export type TUpdateGoalRequest = {
  actions: Pick<IGoalRepository, 'getGoalsByFilter' | 'updateGoal'>
  updatedGoal: Goal
  goalId: string
}

type TUpdateGoalResponse = Goal

export const UpdateGoalService = async ({
  actions,
  updatedGoal,
  goalId,
}: TUpdateGoalRequest): Promise<TUpdateGoalResponse> => {
  const { getGoalsByFilter, updateGoal } = actions

  const startGoalFilter = updatedGoal.createdAt
  const endGoalFilter = updatedGoal.createdAt

  const existentGoal = await getGoalsByFilter(
    updatedGoal.email,
    startGoalFilter,
    endGoalFilter,
  )

  if (!existentGoal.length) throw new Error(throwGoalsMessages.goalNotFound)

  const { updateGoal: update } = GoalsEntitie(updatedGoal.email, existentGoal)

  const goalCompletePercent = progressGoal(updatedGoal.words, updatedGoal.goal)
  const goalComplete = goalCompletePercent >= 100

  const goalUpdated = await update(goalId, {
    ...updatedGoal,
    goalCompletePercent,
    goalComplete,
  })

  await updateGoal(goalId, {
    ...updatedGoal,
    goalCompletePercent,
    goalComplete,
  })

  return goalUpdated
}
