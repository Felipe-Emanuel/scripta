import { v4 as uuidv4 } from 'uuid'
import { Goal, User } from '@prisma/client'
import { databaseGoalsRepository, databaseUserRepository } from '@repositories'

import cron from 'node-cron'
import * as services from '@services'

const { CreateGoalsService, InsertGoalService, UpdateGoalService } = services

const resetGoals = async () => {
  const { getAllUsers } = databaseUserRepository()
  const { createGoals, getGoalsByFilter, updateGoal, getLastGoal } =
    databaseGoalsRepository()

  const users: User[] = await getAllUsers()

  const createGoalAction: services.TCreateGoalsRequest['action'] = {
    createGoals,
  }
  const insertGoalAction: services.TInsertGoalServiceRequest['actions'] = {
    getGoalsByFilter,
    createGoals,
  }
  const updateGoalAction: services.TUpdateGoalRequest['actions'] = {
    getGoalsByFilter,
    updateGoal,
  }

  if (users) {
    users.forEach(async (user) => {
      try {
        const existentGoal = await getLastGoal(user.email)

        const newGoal: Goal = {
          id: uuidv4(),
          email: user.email,
          goalComplete: false,
          goalCompletePercent: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
          goal: 0,
          words: 100,
        }

        if (existentGoal) {
          await UpdateGoalService({
            actions: updateGoalAction,
            goalId: existentGoal.id,
            updatedGoal: existentGoal,
          })

          await InsertGoalService({
            actions: insertGoalAction,
            newGoal,
            endGoalFilter: existentGoal.createdAt,
            startGoalFilter: existentGoal.createdAt,
          })
        } else {
          CreateGoalsService({
            action: createGoalAction,
            email: user.email,
            goals: newGoal,
          })
        }
      } catch (error) {
        console.error(`Erro para o usuário ${user.email}:`, error)
      }
    })
  }
}

export const dailySatisfactionRateJob = cron.schedule(
  '0 0 * * *',
  async () => await resetGoals(),
)
