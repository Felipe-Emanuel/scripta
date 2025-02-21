import { z } from 'zod'
import { throwGoalsMessages } from '@entities/Goals/utils'
import { readerTag } from './create'

export const getReaderByAuthorSchema = {
  schema: {
    description: 'Recupera um leitor específico pelo email.',
    tags: [readerTag],
    params: z.object({
      authorEmail: z
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
