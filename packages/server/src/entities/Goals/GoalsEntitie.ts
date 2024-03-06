import { Goals } from '@prisma/client'
import { TGoalsFilter } from '@types'
import { throwGoalsMessages } from 'src/entities/Goals/utils'

export const GoalsEntitie = (email: string, goals: Goals[]) => {
  const setGoal = async (goals: Goals) => {
    if (goals.email !== email)
      throw new Error(throwGoalsMessages.emailReference)

    if (!goals.month || !goals.week || !goals.day)
      throw new Error(throwGoalsMessages.wrongDate)

    if (
      goals.goalCompletePercent === undefined ||
      goals.goalCompletePercent === null
    )
      throw new Error(throwGoalsMessages.goalCompletePercent)

    return goals
  }

  const getGoals = async (email: string, filter: TGoalsFilter) => {
    if (!email) throw new Error(throwGoalsMessages.missingEmail)

    if (goals[0].email !== email)
      throw new Error(throwGoalsMessages.goalNotFound)

    if (!(filter === 'month' || filter === 'week' || filter === 'day'))
      throw new Error(throwGoalsMessages.wrongFilter)

    return goals
  }

  const insertGoal = async (oldGoals: Goals[], newGoal: Goals) => {
    if (newGoal.email !== email)
      throw new Error(throwGoalsMessages.goalNotFound)

    if (!newGoal.goalCompletePercent)
      throw new Error(throwGoalsMessages.goalCompletePercent)

    return [...oldGoals, newGoal]
  }

  return { setGoal, getGoals, insertGoal }
}
