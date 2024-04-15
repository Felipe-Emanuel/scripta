import { databaseFeedbackRepository, databaseUserRepository } from '@repositories'
import {
  CreateFeedbackService,
  GetFeedbackService,
  GetUserByEmailService,
  TCreateFeedbackServiceRequest,
  TGetByEmailRequest,
  TGetFeedbackServiceRequest
} from '@services'
import { FastifyInstance } from 'fastify'
import { globalErrorMessage } from '@utils'
import { authorization } from 'src/middlewares'

type TGetFeedback = {
  adminEmail: string
}

export default async function feedbackController(app: FastifyInstance) {
  const { createFeedback, getFeedbacks } = databaseFeedbackRepository()
  const { getUserByEmail } = databaseUserRepository()

  const createFeedbackAction: TCreateFeedbackServiceRequest['action'] = {
    createFeedback
  }

  const getFeedbackAction: TGetFeedbackServiceRequest['action'] = {
    getFeedbacks
  }

  const getUserByEmailAction: TGetByEmailRequest['action'] = {
    getUserByEmail
  }

  app.post('/feedback', async (req, apply) => {
    const { feedback } = req.body as Partial<TCreateFeedbackServiceRequest>
    const provider = req.headers.provider
    const accessToken = req.headers.authorization

    await authorization(provider, accessToken, apply)

    const newFeedback = await CreateFeedbackService({
      action: createFeedbackAction,
      feedback
    })

    try {
      apply.send(newFeedback)
    } catch {
      apply.status(500).send({ message: globalErrorMessage.unexpected })
    }
  })

  app.get('/feedback/:adminEmail', async (req, apply) => {
    const { adminEmail } = req.params as TGetFeedback
    const provider = req.headers.provider
    const accessToken = req.headers.authorization

    await authorization(provider, accessToken, apply)

    const user = await GetUserByEmailService({
      action: getUserByEmailAction,
      email: adminEmail
    })

    const isAdmin = user.rule === 'adm'

    const newFeedback = await GetFeedbackService({
      action: getFeedbackAction,
      isAdmin
    })

    try {
      apply.send(newFeedback)
    } catch {
      apply.status(500).send({ message: globalErrorMessage.unexpected })
    }
  })
}
