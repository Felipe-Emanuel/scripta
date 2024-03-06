import { Goals } from '@prisma/client'
import { TGoalsFilter } from '@types'
import { prisma } from 'src/lib'
import { IGoalRepository } from 'src/repositories/GoalRepository'

export const databaseGoalsRepository = (): IGoalRepository => {
  const createGoals = async (goals: Goals): Promise<Goals[]> => {
    const updatedGoals = await prisma.goals.create({
      data: goals,
    })

    return [updatedGoals]
  }

  const getGoalsByFilter = async (
    email: string,
    filter: TGoalsFilter,
    filterValue: number,
  ): Promise<Goals[]> => {
    const existingGoals = await prisma.goals.findMany({
      where: {
        email,
        [filter]: {
          equals: filterValue,
        },
      },
      orderBy: {
        [filter]: 'asc',
      },
    })
    return existingGoals || []
  }

  const patchGoalComplete = async (id: string): Promise<Goals> => {
    const existingGoals = await prisma.goals.findFirstOrThrow({
      where: {
        id,
      },
    })

    if (existingGoals) {
      return await prisma.goals.update({
        where: {
          id: existingGoals.id,
        },
        data: {
          ...existingGoals,
          goalComplete: true,
        },
      })
    }

    return existingGoals
  }

  return {
    createGoals,
    getGoalsByFilter,
    patchGoalComplete,
  }
}
