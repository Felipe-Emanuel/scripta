import { z } from 'zod'
import { throwFeedbackMessages } from '@entities/Feedback/utils'

export const feedbackTag = 'feedback'

export const createFeedbackSchema = {
  schema: {
    description: 'Cria um novo feedback.',
    tags: [feedbackTag],
    body: z.object({
      feedback: z.object({
        feedback: z.string(),
        type: z.string(),
        userEmail: z.string().email({
          message: throwFeedbackMessages.unexpectedEmail
        }),
        screenshot: z.string().nullable()
      })
    }),
    response: {
      500: z.object({
        message: z.string()
      }),
      200: z.object({
        feedback: z.string(),
        type: z.string(),
        id: z.string(),
        userEmail: z.string(),
        screenshot: z.string(),
        createdAt: z.date(),
        updatedAt: z.date()
      })
    }
  }
}

export type TCreateFeedbackBodySchema = z.infer<typeof createFeedbackSchema.schema.body>
