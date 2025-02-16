import { IGoalRepository } from '@repositories'
import { TGetTodayGoalProgressResponse } from '@types'

export type TGoalProgressServiceRequest = {
  action: Pick<IGoalRepository, 'getTodayGoalProgress'>
  userEmail: string
}

type TGoalProgressServiceResponse = TGetTodayGoalProgressResponse

export const GoalProgressService = async ({
  action,
  userEmail
}: TGoalProgressServiceRequest): Promise<TGoalProgressServiceResponse> => {
  const { getTodayGoalProgress } = action

  const todayGoalProgress = getTodayGoalProgress(userEmail)

  return todayGoalProgress
}
