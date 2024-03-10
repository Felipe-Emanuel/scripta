import { Goal } from '@prisma/client'
import { throwGoalsMessages } from '@entities/Goals/utils'

export const GoalsEntitie = (email: string, goals: Goal[]) => {
  const setGoal = async (goals: Goal) => {
    if (goals.email !== email)
      throw new Error(throwGoalsMessages.emailReference)

    if (
      goals.goalCompletePercent === undefined ||
      goals.goalCompletePercent === null
    )
      throw new Error(throwGoalsMessages.goalCompletePercent)

    return goals
  }

  const getGoals = async (
    email: string,
    endGoalFilter: Date,
    startGoalFilter: Date,
  ) => {
    if (!email) throw new Error(throwGoalsMessages.missingEmail)

    if (goals[0].email !== email)
      throw new Error(throwGoalsMessages.goalNotFound)

    if (!endGoalFilter || !startGoalFilter)
      throw new Error(throwGoalsMessages.wrongFilter)

    return goals
  }

  const insertGoal = async (oldGoals: Goal[], newGoal: Goal) => {
    if (newGoal.email !== email)
      throw new Error(throwGoalsMessages.goalNotFound)

    if (!newGoal.goalCompletePercent)
      throw new Error(throwGoalsMessages.goalCompletePercent)

    return [...oldGoals, newGoal]
  }

  const updateGoal = async (goalId: string, updatedGoal: Goal) => {
    if (updatedGoal.id !== goalId)
      throw new Error(throwGoalsMessages.goalNotFound)

    return { ...updatedGoal }
  }

  return { setGoal, getGoals, insertGoal, updateGoal }
}
