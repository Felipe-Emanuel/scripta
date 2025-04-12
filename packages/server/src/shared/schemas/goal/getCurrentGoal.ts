import { z } from 'zod'
import { goalTag } from './create'

export const getCurrentGoalSchema = {
  schema: {
    description: 'Recupera a meta atual do dia.',
    tags: [goalTag],
    response: {
      500: z.object({
        message: z.string()
      }),
      201: z.object({
        id: z.string(),
        goal: z.number(),
        goalComplete: z.boolean(),
        goalCompletePercent: z.number(),
        words: z.number()
      })
    }
  }
}

export type TGetCurrentGoalSchema = z.infer<(typeof getCurrentGoalSchema.schema.response)['201']>
