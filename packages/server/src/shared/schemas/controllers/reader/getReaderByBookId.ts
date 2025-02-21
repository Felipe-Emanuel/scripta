import { z } from 'zod'
import { throwGoalsMessages } from '@entities/Goals/utils'
import { readerTag } from './create'

export const getReaderByBookIdSchema = {
  schema: {
    description: 'Recupera os leitores do autor com base no id do livro selecionado',
    tags: [readerTag],
    params: z.object({
      email: z
        .string()
        .email({
          message: throwGoalsMessages.emailReference
        })
        .email(throwGoalsMessages.missingEmail),
      bookId: z.string().uuid()
    }),
    response: {
      500: z.object({
        message: z.string()
      }),
      200: z.array(
        z.object({
          id: z.string(),
          picture: z.string(),
          userName: z.string(),
          portfolioUrl: z.string(),
          authorEmail: z.string(),
          userEmail: z.string(),
          latitude: z.number(),
          longitude: z.number(),
          createdAt: z.date(),
          updatedAt: z.date()
        })
      )
    }
  }
}
