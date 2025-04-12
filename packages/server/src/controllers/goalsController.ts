import { globalErrorMessage, verifyToken } from '@utils'
import { TFastifyInstance } from '@types'

import { databaseChapterRepository, databaseGoalsRepository } from '@repositories'

import { authorization } from 'src/middlewares'

import {
  goalByFilterSchema,
  updateGoalsSchema,
  getCurrentGoalSchema,
  getDailyProgressSchema,
  TGetCurrentGoalSchema
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
  GetAllChaptersByUserIdService,
  TGetAllChaptersByUserIdRequest,
  TGoalProgressServiceRequest,
  GoalProgressService
} from '@services'

export async function goalsController(app: TFastifyInstance): Promise<void> {
  const { getGoalsByFilter, createGoals, updateGoal, getLastGoal } = databaseGoalsRepository()

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

  const getAllChaptersByUserIdAction: TGetAllChaptersByUserIdRequest['action'] = {
    getAllUpdatedChapters
  }

  const progressAction: TGoalProgressServiceRequest['action'] = {
    getLastGoal
  }

  app.post(
    '/getGoals',
    {
      preHandler: async (req, reply) => {
        const accessToken = req.headers.authorization

        await authorization(accessToken, reply)
      },
      schema: goalByFilterSchema.schema
    },
    async (req, apply) => {
      const decoded = await verifyToken(req.headers.authorization)

      const { endGoalFilter, startGoalFilter } = req.body

      const goals = await GetGoalsByFilterService({
        actions: getByFilterGoalAction,
        userId: decoded?.id,
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
        const accessToken = req.headers.authorization

        await authorization(accessToken, reply)
      },
      schema: updateGoalsSchema.schema
    },
    async (req, apply) => {
      const decoded = await verifyToken(req.headers.authorization)

      const { updatedGoal } = req.body

      const { goal, goalComplete, goalCompletePercent, id, words, createdAt } = updatedGoal

      const updateGoal = await UpdateGoalService({
        actions: updateGoalActions,
        userId: decoded?.id,
        updatedGoal: {
          goal,
          goalComplete,
          goalCompletePercent,
          id,
          words,
          createdAt
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
    '/getLastGoal',
    {
      preHandler: async (req, reply) => {
        const accessToken = req.headers.authorization

        await authorization(accessToken, reply)
      },
      schema: getCurrentGoalSchema.schema
    },
    async (req, apply) => {
      const decoded = await verifyToken(req.headers.authorization)

      let lastGoal: TGetCurrentGoalSchema = {}

      const chapters = await GetAllChaptersByUserIdService({
        action: getAllChaptersByUserIdAction,
        userId: decoded?.id
      })

      const lastExistentGoal = await GetLastGoalService({
        action: getLastGoalAction,
        userId: decoded?.id,
        chapters
      })

      lastGoal = {
        goal: lastExistentGoal.goal,
        goalComplete: lastExistentGoal?.goalComplete,
        goalCompletePercent: lastExistentGoal.goalCompletePercent,
        id: lastExistentGoal.id,
        words: lastExistentGoal.words
      }

      if (!lastGoal) {
        const newGoal = await CreateGoalsService({
          action: createGoalAction,
          userId: decoded?.id,
          goals: {
            goal: {
              goal: 500, // valor pré definido, validar após o MVP se é viável,
              goalComplete: false,
              goalCompletePercent: 0,
              words: 0
            }
          }
        })

        lastGoal = newGoal
      }

      try {
        apply.status(201).send(lastGoal)
      } catch {
        apply.status(500).send({ message: globalErrorMessage.unexpected })
      }
    }
  )

  app.get(
    '/getGoalProgress',
    {
      preHandler: async (req, reply) => {
        const accessToken = req.headers.authorization

        await authorization(accessToken, reply)
      },
      schema: getDailyProgressSchema.schema
    },
    async (req, apply) => {
      const decoded = await verifyToken(req.headers.authorization)

      const progress = await GoalProgressService({
        action: progressAction,
        userId: decoded?.id
      })

      try {
        apply.status(201).send(progress)
      } catch {
        apply.status(500).send({ message: globalErrorMessage.unexpected })
      }
    }
  )
}
