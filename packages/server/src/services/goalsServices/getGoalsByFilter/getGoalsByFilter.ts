import { Goals } from '@prisma/client'
import { TGoalsFilter } from '@types'
import { GoalsEntitie } from 'src/entities/Goals/GoalsEntitie'
import { IGoalRepository } from 'src/repositories/GoalRepository'

export type TGetGoalsByFilterServiceRequest = {
  actions: Pick<IGoalRepository, 'getGoalsByFilter'>
  email: string
  filter: TGoalsFilter
  filterValue: number
}

type TGetGoalsByFilterServiceResponse = Goals[]

export const GetGoalsByFilterService = async ({
  actions,
  email,
  filter,
  filterValue,
}: TGetGoalsByFilterServiceRequest): Promise<TGetGoalsByFilterServiceResponse> => {
  const { getGoalsByFilter } = actions

  const existingGoals = await getGoalsByFilter(email, filter, filterValue)

  if (!existingGoals.length) return []

  const { getGoals } = GoalsEntitie(email, existingGoals)

  const goals = getGoals(email, filter)

  return goals || []
}
