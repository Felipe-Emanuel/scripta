import { z } from 'zod'
import { throwGoalsMessages } from '@utils'

export const goalTag = 'goal'

export const createGoalSchema = {
  schema: {
    description: 'Cria uma nova meta caso o job já não o tenha feito.',
    tags: [goalTag],
    body: z.object({
      goal: z.object({
        goal: z.number(),
        goalComplete: z.boolean().default(false),
        goalCompletePercent: z.number().refine((value) => value === undefined || value === null, {
          message: throwGoalsMessages.goalCompletePercent
        }),
        words: z.number()
      })
    }),
    response: {
      500: z.object({
        message: z.string()
      }),
      201: z.object({
        goal: z.number(),
        id: z.string(),
        goalComplete: z.boolean(),
        goalCompletePercent: z.number(),
        words: z.number()
      })
    }
  }
}

export type TCreateGoalSchema = z.infer<typeof createGoalSchema.schema.body>
export type TCreateGoalResponseSchema = z.infer<(typeof createGoalSchema.schema.response)['201']>
