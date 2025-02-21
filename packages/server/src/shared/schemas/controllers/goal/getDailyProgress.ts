import { z } from 'zod'
import { goalTag } from './create'
import { throwGoalsMessages } from '@entities/Goals/utils'

export const getDailyProgressSchema = {
  schema: {
    description: 'Recupera o progresso da meta atual do dia.',
    tags: [goalTag],
    params: z.object({
      userEmail: z
        .string({
          required_error: throwGoalsMessages.missingEmail
        })
        .email(throwGoalsMessages.missingEmail)
    }),
    response: {
      500: z.object({
        message: z.string()
      }),
      201: z.object({
        id: z.string(),
        words: z.number(),
        goal: z.number(),
        goalCompletePercent: z.number(),
        goalComplete: z.boolean(),
        createdAt: z.date(),
        updatedAt: z.date()
      })
    }
  }
}
