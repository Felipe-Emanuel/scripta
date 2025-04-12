import { databaseFeedbackRepository, databaseUserRepository } from '@repositories'

import { TFastifyInstance } from '@types'
import { globalErrorMessage, verifyToken } from '@utils'
import { authorization } from 'src/middlewares'

import {
  CreateFeedbackService,
  GetByUserIdService,
  GetFeedbackService,
  TCreateFeedbackServiceRequest,
  TGetByUserIdServiceRequest,
  TGetFeedbackServiceRequest
} from '@services'
import { createFeedbackSchema, getFeedbackSchema } from '@schemas'

export async function feedbackController(app: TFastifyInstance) {
  const { createFeedback, getFeedbacks } = databaseFeedbackRepository()
  const { getByUserId } = databaseUserRepository()

  const createFeedbackAction: TCreateFeedbackServiceRequest['action'] = {
    createFeedback
  }

  const getFeedbackAction: TGetFeedbackServiceRequest['action'] = {
    getFeedbacks
  }

  const getUserbyIdAction: TGetByUserIdServiceRequest['action'] = {
    getByUserId
  }

  app.post(
    '/feedback',
    {
      preHandler: async (req, reply) => {
        const accessToken = req.headers.authorization

        await authorization(accessToken, reply)
      },
      schema: createFeedbackSchema.schema
    },
    async (req, apply) => {
      try {
        const decoded = await verifyToken(req.headers.authorization)

        const { feedback: body } = req.body

        const { feedback, screenshot, type } = body

        const createResponse = await CreateFeedbackService({
          action: createFeedbackAction,
          userId: decoded?.id,
          feedback: {
            feedback,
            screenshot,
            type
          }
        })

        apply.status(202).send(createResponse)
      } catch (e) {
        apply.status(500).send({ message: e || globalErrorMessage.unexpected })
      }
    }
  )

  app.get(
    '/feedback',
    {
      preHandler: async (req, reply) => {
        const accessToken = req.headers.authorization

        await authorization(accessToken, reply)
      },
      schema: getFeedbackSchema.schema
    },
    async (req, apply) => {
      try {
        const decoded = await verifyToken(req.headers.authorization)

        const user = await GetByUserIdService({
          action: getUserbyIdAction,
          userid: decoded?.id
        })

        const isAdmin = user.rule === '_A'

        const newFeedback = await GetFeedbackService({
          action: getFeedbackAction,
          isAdmin
        })

        apply.send(newFeedback)
      } catch (e) {
        apply.status(500).send({ message: e || globalErrorMessage.unexpected })
      }
    }
  )
}
