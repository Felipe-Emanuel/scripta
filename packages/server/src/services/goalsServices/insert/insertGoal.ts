import { Goals } from '@prisma/client'
import { TGoalsFilter } from '@types'
import { GoalsEntitie } from 'src/entities/Goals/GoalsEntitie'
import { throwGoalsMessages } from 'src/entities/Goals/utils'
import { IGoalRepository } from 'src/repositories/GoalRepository'
import { getWeekNumber } from 'src/shared/utils/dates'
import { v4 as uuidv4 } from 'uuid'

export type TInsertGoalServiceRequest = {
  actions: Pick<IGoalRepository, 'getGoalsByFilter' | 'createGoals'>
  newGoal: Goals
  filter: TGoalsFilter
  day?: number
}

type TInsertGoalServiceResponse = Goals

export const InsertGoalService = async ({
  actions,
  newGoal,
  filter,
  day,
}: TInsertGoalServiceRequest): Promise<TInsertGoalServiceResponse> => {
  const today = new Date().getDate()
  const { getGoalsByFilter, createGoals } = actions

  const existentGoals = await getGoalsByFilter(
    newGoal.email,
    filter,
    newGoal[filter],
  )

  if (!existentGoals.length) throw new Error(throwGoalsMessages.goalNotFound)

  const lastDay = day ?? existentGoals[0].day

  if (lastDay === today)
    throw new Error(throwGoalsMessages.todaysGoalsAlreadyExists)

  const { setGoal } = GoalsEntitie(newGoal.email, existentGoals)

  const goal = await setGoal({
    ...newGoal,
    id: uuidv4(),
    createdAt: new Date(),
    updatedAt: new Date(),
    week: getWeekNumber(new Date()),
    day: day ?? new Date().getDate(),
    month: new Date().getMonth() + 1,
    email: newGoal.email,
  })

  await createGoals(goal)

  return goal
}
