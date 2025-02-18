import { z } from 'zod'
import { goalTag } from './create'

export const updateGoalsSchema = {
  schema: {
    description: 'Atualiza a meta e a quantidade de palavras, tal como a porcentagem.',
    tags: [goalTag],
    body: z.object({
      updatedGoal: z.object({
        goal: z.number(),
        email: z.string(),
        id: z.string(),
        goalComplete: z.boolean().default(false),
        goalCompletePercent: z.number(),
        words: z.number(),
        createdAt: z.string(),
        updatedAt: z.string()
      })
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
