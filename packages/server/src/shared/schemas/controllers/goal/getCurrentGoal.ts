import { z } from 'zod'
import { goalTag } from './create'
import { throwGoalsMessages } from '@entities/Goals/utils'

export const getCurrentGoalSchema = {
  schema: {
    description: 'Recupera a meta atual do dia.',
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
        goal: z.number(),
        email: z.string(),
        id: z.string(),
        goalComplete: z.boolean(),
        goalCompletePercent: z.number(),
        words: z.number(),
        createdAt: z.date(),
        updatedAt: z.date()
      })
    }
  }
}
