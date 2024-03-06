import { FastifyInstance } from 'fastify'
import { authorization } from 'src/controllers/utils'
import { databaseGoalsRepository } from 'src/repositories/database/databaseGoalsRepository'
import {
  GetGoalsByFilterService,
  TGetGoalsByFilterServiceRequest,
} from 'src/services/goalsServices/getGoalsByFilter/getGoalsByFilter'
import {
  TPatchGoalServiceRequest,
  PatchGoalService,
} from 'src/services/goalsServices/updateGoal/updateGoal'
import { globalErrorMessage } from 'src/shared/utils/globalErrorMessage'

export async function goalsController(app: FastifyInstance): Promise<void> {
  const { patchGoalComplete, getGoalsByFilter } = databaseGoalsRepository()

  const updateGoalActions: TPatchGoalServiceRequest['action'] = {
    patchGoalComplete,
  }
  const getByFilterGoalAction: TGetGoalsByFilterServiceRequest['actions'] = {
    getGoalsByFilter,
  }

  app.patch('/goals', async (req, apply) => {
    const { id, goalCompletePercent } =
      req.body as Partial<TPatchGoalServiceRequest>
    const provider = req.headers.provider
    const accessToken = req.headers.authorization

    await authorization(provider, accessToken, apply)

    const newGoal = await PatchGoalService({
      action: updateGoalActions,
      id,
      goalCompletePercent,
    })

    try {
      apply.send(newGoal)
    } catch {
      apply.status(500).send({ message: globalErrorMessage.unexpected })
    }
  })

  app.get('/goals/:filter/:email/:filterValue', async (req, apply) => {
    const { filter, email, filterValue } =
      req.params as Partial<TGetGoalsByFilterServiceRequest>
    const provider = req.headers.provider
    const accessToken = req.headers.authorization

    await authorization(provider, accessToken, apply)

    const goals = await GetGoalsByFilterService({
      actions: getByFilterGoalAction,
      email,
      filter,
      filterValue,
    })

    try {
      apply.send(goals)
    } catch {
      apply.status(500).send({ message: globalErrorMessage.unexpected })
    }
  })
}
