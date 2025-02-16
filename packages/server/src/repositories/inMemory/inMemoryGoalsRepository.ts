import { Goal } from '@prisma/client'
import { IGoalRepository } from '@repositories'
import { TGetTodayGoalProgressResponse } from '@types'

export const inMemoryGoalsRepository = (): IGoalRepository => {
  let userGoals: Goal[] = []

  const createGoals = async (goals: Goal): Promise<Goal[]> => {
    const updatedGoals = (userGoals = [...userGoals, goals])

    return updatedGoals
  }

  const getGoalsByFilter = async (
    email: string,
    startGoalFilter: Date,
    endGoalFilter: Date
  ): Promise<Goal[]> => {
    const existentGoals = userGoals.filter(
      (goal) =>
        goal.email === email &&
        goal.createdAt === startGoalFilter &&
        goal.createdAt === endGoalFilter
    )

    return existentGoals || []
  }

  const updateGoal = async (userEmail: string, newWords: number, goal = 500): Promise<Goal> => {
    const goalByUserEmail = userGoals.find((goal) => goal.email === userEmail)

    const updatedGoal: Goal = {
      ...goalByUserEmail,
      words: goalByUserEmail.words + newWords,
      goal
    }

    return { ...goalByUserEmail, ...updatedGoal }
  }

  const getLastGoal = async (email: string): Promise<Goal | null> =>
    userGoals.find((goals) => goals.email === email) || null

  const getTodayGoalProgress = async (
    userEmail: string
  ): Promise<TGetTodayGoalProgressResponse> => {
    const dailyGoal = userGoals.find((goal) => goal.email === userEmail)

    return dailyGoal
  }

  return {
    createGoals,
    getGoalsByFilter,
    updateGoal,
    getLastGoal,
    getTodayGoalProgress
  }
}
