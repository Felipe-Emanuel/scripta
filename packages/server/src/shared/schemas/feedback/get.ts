import { z } from 'zod'
import { feedbackTag } from './create'

export const getFeedbackSchema = {
  schema: {
    description: 'Recupera os feedbacks do usuário comum para o usuário adm.',
    tags: [feedbackTag],
    response: {
      500: z.object({
        message: z.string()
      }),
      200: z.array(
        z.object({
          feedback: z.string(),
          type: z.string(),
          id: z.string(),
          userEmail: z.string(),
          screenshot: z.string(),
          createdAt: z.date(),
          updatedAt: z.date()
        })
      )
    }
  }
}
