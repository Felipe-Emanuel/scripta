import { z } from 'zod'
import { goalTag } from './create'

export const getDailyProgressSchema = {
  schema: {
    description: 'Recupera o progresso da meta atual do dia.',
    tags: [goalTag],
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
        createdAt: z.date()
      })
    }
  }
}

export type TGetDailyProgressSchemaResponse = z.infer<
  (typeof getDailyProgressSchema.schema.response)['201']
>
