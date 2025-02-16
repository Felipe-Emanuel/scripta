import { Goal } from '@prisma/client'
import { formateDate } from '@utils'
import { prisma } from 'src/lib'
import { IGoalRepository } from '@repositories'
import { TGetTodayGoalProgressResponse } from '@types'
import { v4 as uuidv4 } from 'uuid'

export const databaseGoalsRepository = (): IGoalRepository => {
  const createGoals = async (goals: Goal): Promise<Goal[]> => {
    const updatedGoals = await prisma.goal.create({
      data: goals
    })

    return [updatedGoals]
  }

  const getGoalsByFilter = async (
    email: string,
    startGoalFilter: Date,
    endGoalFilter: Date
  ): Promise<Goal[]> => {
    const gte = new Date(formateDate(startGoalFilter, 'yyyy-MM-dd'))
    const lte = endGoalFilter

    const existingGoals = await prisma.goal.findMany({
      where: {
        email,
        createdAt: {
          gte,
          lte
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return existingGoals || []
  }

  const updateGoal = async (userEmail: string, newWords: number, goal?: number): Promise<Goal> => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    let dailyGoal = await prisma.goal.findFirst({
      where: {
        email: userEmail,
        createdAt: {
          gte: today
        }
      }
    })

    if (!dailyGoal) {
      dailyGoal = await prisma.goal.create({
        data: {
          email: userEmail,
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

    const goals = await prisma.goal.update({
      where: { id: dailyGoal.id },
      data: {
        words: numericUpdatedWords,
        goalComplete: isGoalComplete,
        goalCompletePercent: progressPercent,
        goal: numericGoal
      }
    })

    return goals
  }

  const getLastGoal = async (email: string): Promise<Goal | null> => {
    const existentGaosl = await prisma.goal.findMany({
      where: {
        email
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return existentGaosl[0] || null
  }

  const getTodayGoalProgress = async (
    userEmail: string
  ): Promise<TGetTodayGoalProgressResponse> => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const dailyGoal = await prisma.goal.findFirst({
      where: {
        email: userEmail,
        createdAt: {
          gte: today
        }
      }
    })

    if (!dailyGoal) {
      return {
        id: uuidv4(),
        words: 0,
        goal: 0,
        goalCompletePercent: 0,
        goalComplete: false,
        createdAt: today,
        updatedAt: today
      }
    }

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
