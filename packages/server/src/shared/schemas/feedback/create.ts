import { z } from 'zod'
import { isBase64, throwFeedbackMessages } from '@utils'

export const feedbackTag = 'feedback'

export const createFeedbackSchema = {
  schema: {
    description: 'Cria um novo feedback.',
    tags: [feedbackTag],
    body: z.object({
      feedback: z.object({
        feedback: z.string({
          message: throwFeedbackMessages.unexpectedFeedback
        }),
        type: z.string({
          required_error: throwFeedbackMessages.unexpectedType
        }),
        screenshot: z
          .string()
          .nullable()
          .refine((value) => value && !isBase64(value), {
            message: throwFeedbackMessages.notBase64
          })
      })
    }),
    response: {
      500: z.object({
        message: z.string()
      }),
      202: z.object({
        message: z.string()
      })
    }
  }
}

export type TCreateFeedbackBodySchema = z.infer<typeof createFeedbackSchema.schema.body>
export type TCreateFeedbackBodySchemaResponse = z.infer<
  (typeof createFeedbackSchema.schema.response)['202']
>
