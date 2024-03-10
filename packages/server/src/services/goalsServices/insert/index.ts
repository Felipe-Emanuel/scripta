import { Goal } from '@prisma/client'
import { GoalsEntitie } from '@entities/index'
import { IGoalRepository } from '@repositories'
import { isToday } from 'date-fns'
import { v4 as uuidv4 } from 'uuid'

export type TInsertGoalServiceRequest = {
  actions: Pick<IGoalRepository, 'getGoalsByFilter' | 'createGoals'>
  newGoal: Goal
  startGoalFilter: Date
  endGoalFilter: Date
}

type TInsertGoalServiceResponse = Goal

export const InsertGoalService = async ({
  actions,
  newGoal,
  endGoalFilter,
  startGoalFilter,
}: TInsertGoalServiceRequest): Promise<TInsertGoalServiceResponse> => {
  const { getGoalsByFilter, createGoals } = actions

  const existentGoals = await getGoalsByFilter(
    newGoal.email,
    startGoalFilter,
    endGoalFilter,
  )

  if (existentGoals.length && isToday(existentGoals[0].createdAt)) return

  const { setGoal } = GoalsEntitie(newGoal.email, existentGoals)

  const goal = await setGoal({
    ...newGoal,
    id: uuidv4(),
    createdAt: new Date(),
    updatedAt: new Date(),
    email: newGoal.email,
  })

  await createGoals(goal)

  return goal
}
