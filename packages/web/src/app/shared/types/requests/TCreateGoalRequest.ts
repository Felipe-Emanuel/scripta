import { TGoalResponse } from '@shared/types'

export type TCreateGoalRequest = {
  email: string
  goals: Partial<TGoalResponse>
}
