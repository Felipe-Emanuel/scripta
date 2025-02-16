import { Goal } from '@prisma/client'
import { TGetTodayGoalProgressResponse } from '@types'

export interface IGoalRepository {
  createGoals: (goal: Goal) => Promise<Goal[]>
  getGoalsByFilter: (email: string, startGoalFilter: Date, endGoalFilter: Date) => Promise<Goal[]>
  updateGoal: (userEmail: string, newWords: number, goal?: number) => Promise<Goal>
  getLastGoal: (email: string) => Promise<Goal | null>
  getTodayGoalProgress: (userEmail: string) => Promise<TGetTodayGoalProgressResponse>
}
