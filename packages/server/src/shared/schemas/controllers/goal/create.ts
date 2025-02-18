import { z } from 'zod'
import { throwGoalsMessages } from '@entities/Goals/utils'

export const goalTag = 'goal'

export const createGoalSchema = {
  schema: {
    description: 'Cria uma nova meta caso o job já não o tenha feito.',
    tags: [goalTag],
    body: z.object({
      email: z.string().email({
        message: throwGoalsMessages.emailReference
      }),
      goal: z.object({
        goal: z.number(),
        goalComplete: z.boolean().default(false),
        goalCompletePercent: z.number(),
        words: z.number()
      })
    }),
    response: {
      500: z.object({
        message: z.string()
      }),
      201: z.array(
        z.object({
          goal: z.number(),
          email: z.string(),
          id: z.string(),
          goalComplete: z.boolean(),
          goalCompletePercent: z.number(),
          words: z.number(),
          createdAt: z.date(),
          updatedAt: z.date()
        })
      )
    }
  }
}

export type TCreateGoalSchema = z.infer<typeof createGoalSchema.schema.body>
