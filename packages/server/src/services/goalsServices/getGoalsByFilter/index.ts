import { IGoalRepository } from '@repositories'
import { TGoalByFilterSchemaResponse } from '@schemas'
import { throwGoalsMessages } from '@utils'

export type TGetGoalsByFilterServiceRequest = {
  actions: Pick<IGoalRepository, 'getGoalsByFilter'>
  userId: string
  startGoalFilter: Date
  endGoalFilter: Date
}

type TGetGoalsByFilterServiceResponse = TGoalByFilterSchemaResponse

export const GetGoalsByFilterService = async ({
  actions,
  userId,
  endGoalFilter,
  startGoalFilter
}: TGetGoalsByFilterServiceRequest): Promise<TGetGoalsByFilterServiceResponse> => {
  const { getGoalsByFilter } = actions

  if (!userId) throw new Error(throwGoalsMessages.missingGoaluserId)

  const existingGoals = await getGoalsByFilter(userId, startGoalFilter, endGoalFilter)

  return existingGoals || []
}
