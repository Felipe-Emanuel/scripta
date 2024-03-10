import { TGoalResponse } from '@shared/types'

export type TUpdateCurrentGoalRequest = {
  goalId: string
  updatedGoal: Partial<TGoalResponse>
}
