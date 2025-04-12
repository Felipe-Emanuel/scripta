import { Goal } from '@prisma/client'
import { formateDate } from '@utils'
import { prisma } from 'src/lib'
import { IGoalRepository } from '@repositories'
import { TCreateGoalResponseSchema, TGoalByFilterSchemaResponse } from '@schemas'
import { TGoalEntitie } from '@services'

export const databaseGoalsRepository = (): IGoalRepository => {
  const createGoals = async (goal: TGoalEntitie): Promise<TCreateGoalResponseSchema> => {
    const updatedGoals = await prisma.goal.create({
      data: goal
    })

    return {
      goal: updatedGoals.goal,
      goalComplete: updatedGoals.goalComplete,
      goalCompletePercent: updatedGoals.goalCompletePercent,
      id: updatedGoals.id,
      words: updatedGoals.words
    }
  }

  const getGoalsByFilter = async (
    userId: string,
    startGoalFilter: Date,
    endGoalFilter: Date
  ): Promise<TGoalByFilterSchemaResponse> => {
    const gte = new Date(formateDate(startGoalFilter, 'yyyy-MM-dd'))
    const lte = endGoalFilter

    const existingGoals = await prisma.goal.findMany({
      where: {
        userId,
        createdAt: {
          gte,
          lte
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    const formatedGoals: TGoalByFilterSchemaResponse =
      existingGoals?.map((goals) => ({
        id: goals.id,
        goal: goals.goal,
        goalComplete: goals.goalComplete,
        goalCompletePercent: goals.goalCompletePercent,
        words: goals.words
      })) || []

    return formatedGoals
  }

  const updateGoal = async (userId: string, newWords: number, goal?: number): Promise<Goal> => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    let dailyGoal = await prisma.goal.findFirst({
      where: {
        userId: userId,
        createdAt: {
          gte: today
        }
      }
    })

    if (!dailyGoal) {
      dailyGoal = await prisma.goal.create({
        data: {
          userId,
          goal,
          words: 0,
          goalCompletePercent: 0,
          goalComplete: false
        }
      })
    }

    const updatedWords = dailyGoal.words + newWords
    const numericGoal = goal ?? dailyGoal?.goal
    const numericUpdatedWords = updatedWords

    const progressPercent = numericGoal > 0 ? (numericUpdatedWords / numericGoal) * 100 : 0
    const isGoalComplete = progressPercent >= 100

    const updatedGoal = await prisma.goal.update({
      where: { id: dailyGoal.id },
      data: {
        words: numericUpdatedWords,
        goalComplete: isGoalComplete,
        goalCompletePercent: progressPercent,
        goal: numericGoal
      }
    })

    return updatedGoal
  }

  const getLastGoal = async (userId: string): Promise<Goal | null> => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const existentGoals = await prisma.goal.findMany({
      where: {
        userId,
        createdAt: {
          gte: today
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    if (existentGoals.length === 0) {
      return null
    }

    return existentGoals[0]
  }

  return {
    createGoals,
    getGoalsByFilter,
    updateGoal,
    getLastGoal
  }
}
