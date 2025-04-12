import { TCreateGoalResponseSchema, TGetDailyProgressSchemaResponse } from '@schemas'
import { TGoalEntitie } from '@services'

export interface IGoalRepository {
  createGoals: (goal: TGoalEntitie) => Promise<TCreateGoalResponseSchema>
  getGoalsByFilter: (
    userId: string,
    startGoalFilter: Date,
    endGoalFilter: Date
  ) => Promise<TCreateGoalResponseSchema[]>
  updateGoal: (
    userId: string,
    newWords: number,
    goal?: number
  ) => Promise<TCreateGoalResponseSchema>
  getLastGoal: (userId: string) => Promise<TGetDailyProgressSchemaResponse | null>
}
