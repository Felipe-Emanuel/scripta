import { z } from 'zod'
import { throwGoalsMessages } from '@entities/Goals/utils'
import { readerTag } from './create'

export const getReaderByEmailSchema = {
  schema: {
    description: 'Recupera um leitor específico pelo email.',
    tags: [readerTag],
    params: z.object({
      readerEmail: z
        .string()
        .email({
          message: throwGoalsMessages.emailReference
        })
        .email(throwGoalsMessages.missingEmail)
    }),
    response: {
      500: z.object({
        message: z.string()
      }),
      200: z.object({
        email: z.string(),
        id: z.string(),
        name: z.string(),
        picture: z.string(),
        portfolioUrl: z.string(),
        hits: z.number(),
        booksCount: z.number()
      })
    }
  }
}
