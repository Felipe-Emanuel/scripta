import { z } from 'zod'
import { readerTag } from './create'
import { throwGoalsMessages } from '~/src/entities/Goals/utils'

export const updateReaderSchema = {
  schema: {
    description: 'Atualiza um leitor de um escritor. (INATIVO)',
    tags: [readerTag],
    params: z.object({
      email: z
        .string()
        .email({
          message: throwGoalsMessages.emailReference
        })
        .email(throwGoalsMessages.missingEmail),
      readerId: z.string().uuid()
    }),
    body: z.object({
      newReader: z.object({
        id: z.string(),
        picture: z.string(),
        userName: z.string(),
        portfolioUrl: z.string(),
        authorEmail: z.string(),
        userEmail: z.string(),
        latitude: z.number(),
        longitude: z.number(),
        createdAt: z.string(),
        updatedAt: z.string()
      })
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
