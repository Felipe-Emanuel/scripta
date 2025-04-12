import { IGoalRepository } from '@repositories'
import { TGetDailyProgressSchemaResponse } from '@schemas'

export type TGoalProgressServiceRequest = {
  action: Pick<IGoalRepository, 'getLastGoal'>
  userId: string
}

type TGoalProgressServiceResponse = TGetDailyProgressSchemaResponse

export const GoalProgressService = async ({
  action,
  userId
}: TGoalProgressServiceRequest): Promise<TGoalProgressServiceResponse> => {
  const { getLastGoal } = action

  const todayGoalProgress = await getLastGoal(userId)

  return {
    goal: todayGoalProgress.goal,
    goalComplete: todayGoalProgress.goalComplete,
    goalCompletePercent: todayGoalProgress.goalCompletePercent,
    id: todayGoalProgress.id,
    words: todayGoalProgress.words,
    createdAt: todayGoalProgress.createdAt
  }
}
