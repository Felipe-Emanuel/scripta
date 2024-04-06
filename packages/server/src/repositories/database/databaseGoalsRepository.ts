import { Goal } from '@prisma/client'
import { formateDate } from '@utils'
import { prisma } from 'src/lib'
import { IGoalRepository } from 'src/repositories/GoalRepository'

export const databaseGoalsRepository = (): IGoalRepository => {
  const createGoals = async (goals: Goal): Promise<Goal[]> => {
    const updatedGoals = await prisma.goal.create({
      data: goals,
    })

    return [updatedGoals]
  }

  const getGoalsByFilter = async (
    email: string,
    startGoalFilter: Date,
    endGoalFilter: Date,
  ): Promise<Goal[]> => {
    const gte = new Date(formateDate(startGoalFilter, 'yyyy-MM-dd'))
    const lte = endGoalFilter

    const existingGoals = await prisma.goal.findMany({
      where: {
        email,
        createdAt: {
          gte,
          lte,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return existingGoals || []
  }

  const updateGoal = async (
    goalId: string,
    updatedGoal: Goal,
  ): Promise<Goal> => {
    const existingGoals = await prisma.goal.findFirstOrThrow({
      where: {
        id: goalId,
      },
    })

    if (existingGoals) {
      return await prisma.goal.update({
        where: {
          id: goalId,
        },
        data: { ...updatedGoal },
      })
    }

    return existingGoals
  }

  const getLastGoal = async (email: string): Promise<Goal | null> => {
    const existentGaosl = await prisma.goal.findMany({
      where: {
        email,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return existentGaosl[0] || null
  }

  return {
    createGoals,
    getGoalsByFilter,
    updateGoal,
    getLastGoal,
  }
}
