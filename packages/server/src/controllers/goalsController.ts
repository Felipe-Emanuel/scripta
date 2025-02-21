import { globalErrorMessage } from '@utils'
import { isToday } from 'date-fns'
import { TFastifyInstance } from '@types'

import { databaseChapterRepository, databaseGoalsRepository } from '@repositories'

import { authorization } from 'src/middlewares'

import {
  createGoalSchema,
  goalByFilterSchema,
  updateGoalsSchema,
  getCurrentGoalSchema,
  getDailyProgressSchema
} from '@schemas'

import {
  TGetGoalsByFilterServiceRequest,
  TCreateGoalsRequest,
  GetGoalsByFilterService,
  CreateGoalsService,
  TUpdateGoalRequest,
  UpdateGoalService,
  TGetLastGoalRequest,
  GetLastGoalService,
  GetAllChaptersByUserEmailService,
  TGetAllChaptersByUserEmailRequest,
  TGoalProgressServiceRequest,
  GoalProgressService
} from '@services'

export async function goalsController(app: TFastifyInstance): Promise<void> {
  const { getGoalsByFilter, createGoals, updateGoal, getLastGoal, getTodayGoalProgress } =
    databaseGoalsRepository()

  const { getAllUpdatedChapters } = databaseChapterRepository()

  const getByFilterGoalAction: TGetGoalsByFilterServiceRequest['actions'] = {
    getGoalsByFilter
  }

  const createGoalAction: TCreateGoalsRequest['action'] = {
    createGoals
  }

  const updateGoalActions: TUpdateGoalRequest['actions'] = {
    getGoalsByFilter,
    updateGoal
  }

  const getLastGoalAction: TGetLastGoalRequest['action'] = {
    getLastGoal,
    updateGoal
  }

  const getAllChaptersByUserEmailAction: TGetAllChaptersByUserEmailRequest['action'] = {
    getAllUpdatedChapters
  }

  const progressAction: TGoalProgressServiceRequest['action'] = {
    getTodayGoalProgress
  }

  app.post('/goals', createGoalSchema, async (req, apply) => {
    const { email, goal } = req.body

    const existentGoal = await getLastGoal(email)

    if (existentGoal) {
      const lastGoal = existentGoal.createdAt

      if (isToday(lastGoal)) return
    }

    const newGoal = await CreateGoalsService({
      action: createGoalAction,
      email,
      goals: {
        goal,
        email
      }
    })

    try {
      apply.status(201).send(newGoal)
    } catch {
      apply.status(500).send({ message: globalErrorMessage.unexpected })
    }
  })

  app.post(
    '/getGoals',
    {
      preHandler: async (req, reply) => {
        const provider = req.headers.provider
        const accessToken = req.headers.authorization

        await authorization(provider, accessToken, reply)
      },
      schema: goalByFilterSchema.schema
    },
    async (req, apply) => {
      const { email, endGoalFilter, startGoalFilter } = req.body

      const goals = await GetGoalsByFilterService({
        actions: getByFilterGoalAction,
        email,
        endGoalFilter: new Date(endGoalFilter),
        startGoalFilter: new Date(startGoalFilter)
      })

      try {
        apply.status(200).send(goals)
      } catch {
        apply.status(500).send({ message: globalErrorMessage.unexpected })
      }
    }
  )

  app.put(
    '/updateGoals',
    {
      preHandler: async (req, reply) => {
        const provider = req.headers.provider
        const accessToken = req.headers.authorization

        await authorization(provider, accessToken, reply)
      },
      schema: updateGoalsSchema.schema
    },
    async (req, apply) => {
      const { updatedGoal } = req.body

      const { email, goal, goalComplete, goalCompletePercent, id, words } = updatedGoal

      const updateGoal = await UpdateGoalService({
        actions: updateGoalActions,
        updatedGoal: {
          email,
          goal,
          goalComplete,
          goalCompletePercent,
          id,
          words,
          createdAt: new Date(updatedGoal.createdAt),
          updatedAt: new Date(updatedGoal.updatedAt)
        }
      })

      try {
        apply.status(201).send(updateGoal)
      } catch {
        apply.status(500).send({ message: globalErrorMessage.unexpected })
      }
    }
  )

  app.get(
    '/getLastGoal/:userEmail',
    {
      preHandler: async (req, reply) => {
        const provider = req.headers.provider
        const accessToken = req.headers.authorization

        await authorization(provider, accessToken, reply)
      },
      schema: getCurrentGoalSchema.schema
    },
    async (req, apply) => {
      const { userEmail } = req.params

      const chapters = await GetAllChaptersByUserEmailService({
        action: getAllChaptersByUserEmailAction,
        paramUserEmail: userEmail
      })

      const lastGoal = await GetLastGoalService({
        action: getLastGoalAction,
        paramUserEmail: userEmail,
        chapters
      })

      try {
        apply.status(201).send(lastGoal)
      } catch {
        apply.status(500).send({ message: globalErrorMessage.unexpected })
      }
    }
  )

  app.get(
    '/getGoalProgress/:userEmail',
    {
      preHandler: async (req, reply) => {
        const provider = req.headers.provider
        const accessToken = req.headers.authorization

        await authorization(provider, accessToken, reply)
      },
      schema: getDailyProgressSchema.schema
    },
    async (req, apply) => {
      const { userEmail } = req.params

      const progress = await GoalProgressService({
        action: progressAction,
        userEmail
      })

      try {
        apply.status(201).send(progress)
      } catch {
        apply.status(500).send({ message: globalErrorMessage.unexpected })
      }
    }
  )
}
