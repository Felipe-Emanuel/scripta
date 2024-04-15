import { globalErrorMessage, progressGoal } from '@utils'
import { isToday } from 'date-fns'
import { FastifyInstance } from 'fastify'
import { databaseGoalsRepository } from '@repositories'
import {
  TGetGoalsByFilterServiceRequest,
  TCreateGoalsRequest,
  GetGoalsByFilterService,
  CreateGoalsService,
  TUpdateGoalRequest,
  UpdateGoalService,
  TGetLastGoalRequest,
  GetLastGoalService
} from '@services'
import { authorization } from 'src/middlewares'

export async function goalsController(app: FastifyInstance): Promise<void> {
  const { getGoalsByFilter, createGoals, updateGoal, getLastGoal } = databaseGoalsRepository()

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
    getLastGoal
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
      goalComplete: false,
      goalCompletePercent: progressGoal(goal.words, goal.goal)
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
    const { goalId, updatedGoal } = req.body as Partial<TUpdateGoalRequest>
    const provider = req.headers.provider
    const accessToken = req.headers.authorization

    await authorization(provider, accessToken, apply)

    const updateGoal = await UpdateGoalService({
      actions: updateGoalActions,
      goalId,
      updatedGoal
    })

    try {
      apply.send(updateGoal)
    } catch {
      apply.status(500).send({ message: globalErrorMessage.unexpected })
    }
  })

  // recupera a meta atual
  app.post('/getLastGoal', async (req, apply) => {
    const { email } = req.body as Partial<TGetLastGoalRequest>
    const provider = req.headers.provider
    const accessToken = req.headers.authorization

    await authorization(provider, accessToken, apply)

    const lastGoal = await GetLastGoalService({
      action: getLastGoalAction,
      email
    })

    try {
      apply.send(lastGoal)
    } catch {
      apply.status(500).send({ message: globalErrorMessage.unexpected })
    }
  })
}
