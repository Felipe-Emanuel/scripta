import { Goals } from '@prisma/client'
import { TGoalsFilter } from '@types'
import { IGoalRepository } from 'src/repositories/GoalRepository'

export const inMemoryGoalsRepository = (): IGoalRepository => {
  let userGoals: Goals[] = []

  const createGoals = async (goals: Goals): Promise<Goals[]> => {
    const updatedGoals = (userGoals = [...userGoals, goals])

    return updatedGoals
  }

  const getGoalsByFilter = async (
    email: string,
    filter: TGoalsFilter,
    filterValue: number,
  ): Promise<Goals[]> => {
    const existentGoals = userGoals.filter(
      (goal) => goal.email === email && goal[filter] === filterValue,
    )

    return existentGoals || []
  }

  const patchGoalComplete = async (id: string): Promise<Goals> => {
    const existingGoals = userGoals.find((goals) => goals.id === id)

    return {
      ...existingGoals,
      goalComplete: true,
    }
  }

  return {
    createGoals,
    getGoalsByFilter,
    patchGoalComplete,
  }
}
