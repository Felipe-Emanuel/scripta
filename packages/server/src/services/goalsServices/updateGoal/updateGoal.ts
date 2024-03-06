import { Goals } from '@prisma/client'
import { throwGoalsMessages } from 'src/entities/Goals/utils'
import { IGoalRepository } from 'src/repositories/GoalRepository'

export type TPatchGoalServiceRequest = {
  action: Pick<IGoalRepository, 'patchGoalComplete'>
  id: string
  goalCompletePercent: number
}

type TPatchGoalServiceResponse = Goals

export const PatchGoalService = async ({
  action,
  goalCompletePercent,
  id,
}: TPatchGoalServiceRequest): Promise<TPatchGoalServiceResponse> => {
  const { patchGoalComplete } = action

  if (!id) throw new Error(throwGoalsMessages.missingGoalId)

  if (goalCompletePercent >= 100) {
    return await patchGoalComplete(id)
  } else {
    throw new Error(throwGoalsMessages.insufficientGoalCompletePercent)
  }
}
