import { Goal } from '@prisma/client'
import { GoalsEntitie } from '@entities/index'
import { IGoalRepository } from '@repositories'

export type TGetGoalsByFilterServiceRequest = {
  actions: Pick<IGoalRepository, 'getGoalsByFilter'>
  email: string
  startGoalFilter: Date
  endGoalFilter: Date
}

type TGetGoalsByFilterServiceResponse = Goal[]

export const GetGoalsByFilterService = async ({
  actions,
  email,
  endGoalFilter,
  startGoalFilter,
}: TGetGoalsByFilterServiceRequest): Promise<TGetGoalsByFilterServiceResponse> => {
  const { getGoalsByFilter } = actions

  const existingGoals = await getGoalsByFilter(
    email,
    startGoalFilter,
    endGoalFilter,
  )

  if (!existingGoals.length) return []

  const { getGoals } = GoalsEntitie(email, existingGoals)

  const goals = getGoals(email, endGoalFilter, startGoalFilter)

  return goals || []
}
