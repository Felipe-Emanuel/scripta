import { Goals, User } from '@prisma/client'
import cron from 'node-cron'
import { databaseGoalsRepository } from 'src/repositories/database/databaseGoalsRepository'
import { databaseUserRepository } from 'src/repositories/database/databaseUserRepository'
import { databaseWordCounterRepository } from 'src/repositories/database/databaseWordCounterRepository'
import {
  CreateGoalsService,
  TCreateGoalsRequest,
} from 'src/services/goalsServices/create/CreateGoals'
import {
  InsertGoalService,
  TInsertGoalServiceRequest,
} from 'src/services/goalsServices/insert/insertGoal'
import {
  CreateWordCountersServices,
  TCreateCreateWordCountersServicesRequest,
} from 'src/services/wordCountersServices/create/createWordCounter'
import {
  InsertWordCountService,
  TInsertWordCountServiceRequest,
} from 'src/services/wordCountersServices/insert/insertWordCount'
import { getWeekNumber } from 'src/shared/utils/dates'
import { v4 as uuidv4 } from 'uuid'

const resetGoals = async () => {
  const { getAllUsers } = databaseUserRepository()
  const { createGoals, getGoalsByFilter } = databaseGoalsRepository()
  const { insertWordCount, getCounterByEmail, createWordCounter } =
    databaseWordCounterRepository()
  const users: User[] = await getAllUsers()

  const createGoalAction: TCreateGoalsRequest['action'] = { createGoals }
  const insertGoalAction: TInsertGoalServiceRequest['actions'] = {
    getGoalsByFilter,
    createGoals,
  }
  const insertWordCountAction: TInsertWordCountServiceRequest['action'] = {
    getCounterByEmail,
    insertWordCount,
  }
  const createWordCountersAction: TCreateCreateWordCountersServicesRequest['action'] =
    {
      getCounterByEmail,
      createWordCounter,
    }

  if (users) {
    users.forEach(async (user) => {
      const today = new Date().getDate()

      const existentGoals = await getGoalsByFilter(user.email, 'day', today)

      const newGoal: Goals = {
        id: uuidv4(),
        email: user.email,
        goalComplete: false,
        goalCompletePercent: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        week: getWeekNumber(new Date()),
        day: today,
        month: new Date().getMonth() + 1,
      }

      if (existentGoals.length) {
        await InsertGoalService({
          actions: insertGoalAction,
          filter: 'day',
          newGoal,
        })
      } else {
        CreateGoalsService({
          action: createGoalAction,
          email: user.email,
          goals: newGoal,
        })
      }

      const existentWordCount = await getCounterByEmail(user.email)

      if (existentWordCount) {
        await InsertWordCountService({
          action: insertWordCountAction,
          email: user.email,
          words: 0,
        })
      } else {
        await CreateWordCountersServices({
          action: createWordCountersAction,
          email: user.email,
          wordCounterId: uuidv4(),
          words: 0,
        })
      }
    })
  }
}

export const dailySatisfactionRateJob = cron.schedule(
  '0 0 * * *',
  async () => await resetGoals(),
)
