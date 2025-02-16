import { TGoalResponse } from '@shared/types'

export type TUpdateCurrentGoalRequest = {
  updatedGoal: Partial<TGoalResponse>
}
