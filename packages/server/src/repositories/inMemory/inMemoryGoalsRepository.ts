import { Goal } from '@prisma/client'
import { IGoalRepository } from 'src/repositories/GoalRepository'

export const inMemoryGoalsRepository = (): IGoalRepository => {
  let userGoals: Goal[] = []

  const createGoals = async (goals: Goal): Promise<Goal[]> => {
    const updatedGoals = (userGoals = [...userGoals, goals])

    return updatedGoals
  }

  const getGoalsByFilter = async (
    email: string,
    startGoalFilter: Date,
    endGoalFilter: Date,
  ): Promise<Goal[]> => {
    const existentGoals = userGoals.filter(
      (goal) =>
        goal.email === email &&
        goal.createdAt === startGoalFilter &&
        goal.createdAt === endGoalFilter,
    )

    return existentGoals || []
  }

  const updateGoal = async (
    goalId: string,
    updatedGoal: Goal,
  ): Promise<Goal> => {
    const existingGoals = userGoals.find((goals) => goals.id === goalId)

    return { ...existingGoals, ...updatedGoal } || existingGoals
  }

  const getLastGoal = async (email: string): Promise<Goal | null> =>
    userGoals.find((goals) => goals.email === email) || null

  return {
    createGoals,
    getGoalsByFilter,
    updateGoal,
    getLastGoal,
  }
}
