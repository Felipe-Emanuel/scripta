import { databaseFeedbackRepository, databaseUserRepository } from '@repositories'

import { TFastifyInstance } from '@types'
import { globalErrorMessage } from '@utils'
import { authorization } from 'src/middlewares'

import {
  CreateFeedbackService,
  GetFeedbackService,
  GetUserByEmailService,
  TCreateFeedbackServiceRequest,
  TGetByEmailRequest,
  TGetFeedbackServiceRequest
} from '@services'
import { createFeedbackSchema, getFeedbackSchema } from '@schemas'

export async function feedbackController(app: TFastifyInstance) {
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

  app.post(
    '/feedback',
    {
      preHandler: async (req, reply) => {
        const provider = req.headers.provider
        const accessToken = req.headers.authorization

        await authorization(provider, accessToken, reply)
      },
      schema: createFeedbackSchema.schema
    },
    async (req, apply) => {
      const { feedback: body } = req.body

      const { feedback, screenshot, type, userEmail } = body

      const newFeedback = await CreateFeedbackService({
        action: createFeedbackAction,
        feedback: {
          userEmail,
          feedback,
          screenshot,
          type
        }
      })

      try {
        apply.status(200).send(newFeedback)
      } catch {
        apply.status(500).send({ message: globalErrorMessage.unexpected })
      }
    }
  )

  app.get(
    '/feedback/:adminEmail',
    {
      preHandler: async (req, reply) => {
        const provider = req.headers.provider
        const accessToken = req.headers.authorization

        await authorization(provider, accessToken, reply)
      },
      schema: getFeedbackSchema.schema
    },
    async (req, apply) => {
      const { adminEmail } = req.params

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
    }
  )
}
