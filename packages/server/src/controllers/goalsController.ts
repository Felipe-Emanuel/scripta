import { globalErrorMessage } from '@utils'
import { isToday } from 'date-fns'
import { FastifyInstance } from 'fastify'
import { databaseChapterRepository, databaseGoalsRepository } from '@repositories'
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
import { authorization } from 'src/middlewares'
import { goalProgressServiceSchema, getLastGoalSchema } from '@schemas'

export async function goalsController(app: FastifyInstance): Promise<void> {
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

  // cria uma nova meta caso o job já não o tenha feito
  app.post('/goals', async (req, apply) => {
    const { email, goals: goal } = req.body as Partial<TCreateGoalsRequest>

    const existentGoal = await getLastGoal(email)

    if (existentGoal) {
      const lastGoal = existentGoal.createdAt

      if (isToday(lastGoal)) return
    }

    const newGoals = {
      ...goal,
      email,
      goalComplete: false
    }

    const newGoal = await CreateGoalsService({
      action: createGoalAction,
      email,
      goals: newGoals
    })

    try {
      apply.send(newGoal)
    } catch {
      apply.status(500).send({ message: globalErrorMessage.unexpected })
    }
  })

  // recupera as metas de acordo com o filtro de início da data e fim da data
  app.post('/getGoals', async (req, apply) => {
    const { email, endGoalFilter, startGoalFilter } =
      req.body as Partial<TGetGoalsByFilterServiceRequest>
    const provider = req.headers.provider
    const accessToken = req.headers.authorization

    await authorization(provider, accessToken, apply)

    const goals = await GetGoalsByFilterService({
      actions: getByFilterGoalAction,
      email,
      endGoalFilter,
      startGoalFilter
    })

    try {
      apply.send(goals)
    } catch {
      apply.status(500).send({ message: globalErrorMessage.unexpected })
    }
  })

  // atualiza a meta e a quantidade de palavras, tal como a porcentagem
  app.put('/updateGoals', async (req, apply) => {
    const { updatedGoal } = req.body as Partial<TUpdateGoalRequest>
    const provider = req.headers.provider
    const accessToken = req.headers.authorization

    await authorization(provider, accessToken, apply)

    const updateGoal = await UpdateGoalService({
      actions: updateGoalActions,
      updatedGoal
    })

    try {
      apply.send(updateGoal)
    } catch {
      apply.status(500).send({ message: globalErrorMessage.unexpected })
    }
  })

  // recupera a meta atual
  app.get('/getLastGoal/:userEmail', async (req, apply) => {
    const { userEmail } = getLastGoalSchema.parse(req.params)
    const provider = req.headers.provider
    const accessToken = req.headers.authorization

    await authorization(provider, accessToken, apply)

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
      apply.send(lastGoal)
    } catch {
      apply.status(500).send({ message: globalErrorMessage.unexpected })
    }
  })

  app.get('/getGoalProgress/:userEmail', async (req, apply) => {
    const { userEmail } = goalProgressServiceSchema.parse(req.params)
    const provider = req.headers.provider
    const accessToken = req.headers.authorization

    await authorization(provider, accessToken, apply)

    const progress = await GoalProgressService({
      action: progressAction,
      userEmail
    })

    try {
      apply.send(progress)
    } catch {
      apply.status(500).send({ message: globalErrorMessage.unexpected })
    }
  })
}
