import { Goal } from '@prisma/client'

export interface IGoalRepository {
  createGoals: (goal: Goal) => Promise<Goal[]>
  getGoalsByFilter: (
    email: string,
    startGoalFilter: Date,
    endGoalFilter: Date,
  ) => Promise<Goal[]>
  updateGoal: (goalId: string, updatedGoal: Goal) => Promise<Goal>
  getLastGoal: (email: string) => Promise<Goal | null>
}
