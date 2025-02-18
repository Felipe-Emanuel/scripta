import { z } from 'zod'
import { throwGoalsMessages } from '~/src/entities/Goals/utils'

export const readerTag = 'reader'

export const createReaderSchema = {
  schema: {
    description: 'Cria um leitor para um autor',
    tags: [readerTag],
    body: z.object({
      userEmail: z
        .string()
        .email({
          message: throwGoalsMessages.emailReference
        })
        .email(throwGoalsMessages.missingEmail),
      location: z.object({
        latitude: z.number(),
        longitude: z.number()
      }),
      authorEmail: z
        .string()
        .email({
          message: throwGoalsMessages.emailReference
        })
        .email(throwGoalsMessages.missingEmail),
      bookId: z.string().uuid(),
      userName: z.string(),
      picture: z.string(),
      portfolioUrl: z.string().url()
    }),
    response: {
      500: z.object({
        message: z.string()
      }),
      201: z.object({
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
    }
  }
}
