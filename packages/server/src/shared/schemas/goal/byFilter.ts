import { z } from 'zod'
import { goalTag } from './create'
import { throwGoalsMessages } from '@utils'

export const goalByFilterSchema = {
  schema: {
    description: 'Recupera as metas de acordo com o filtro de início da data e fim da data.',
    tags: [goalTag],
    body: z.object({
      endGoalFilter: z.string({
        required_error: throwGoalsMessages.wrongFilter
      }),
      startGoalFilter: z.string({
        required_error: throwGoalsMessages.wrongFilter
      })
    }),
    response: {
      500: z.object({
        message: z.string()
      }),
      200: z.array(
        z.object({
          id: z.string(),
          goal: z.number(),
          goalComplete: z.boolean(),
          goalCompletePercent: z.number(),
          words: z.number()
        })
      )
    }
  }
}

export type TGoalByFilterSchemaResponse = z.infer<
  (typeof goalByFilterSchema.schema.response)['200']
>
