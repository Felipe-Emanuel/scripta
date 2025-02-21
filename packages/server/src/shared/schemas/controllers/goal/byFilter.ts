import { z } from 'zod'
import { throwGoalsMessages } from '@entities/Goals/utils'
import { goalTag } from './create'

export const goalByFilterSchema = {
  schema: {
    description: 'Recupera as metas de acordo com o filtro de início da data e fim da data.',
    tags: [goalTag],
    body: z.object({
      email: z.string().email({
        message: throwGoalsMessages.emailReference
      }),
      endGoalFilter: z.string(),
      startGoalFilter: z.string()
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
