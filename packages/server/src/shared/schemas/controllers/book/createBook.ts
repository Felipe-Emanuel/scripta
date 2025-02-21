import { z } from 'zod'
import { bookTag } from './getAllBooks'
import { throwBookMessages } from '~/src/entities/Book/utils'

export const createBookSchema = {
  schema: {
    description: 'Criação de um novo livro para o usuário.',
    tags: [bookTag],
    params: z.object({
      userEmail: z.string({
        required_error: throwBookMessages.emailMissing
      })
    }),
    body: z.object({
      book: z.object({
        title: z.string(),
        description: z.string(),
        Gender: z.string().nullable(),
        Theme: z.string().nullable(),
        conclued: z.boolean(),
        heroPathUrl: z.string(),
        socialLink: z.string().nullable(),
        isActive: z.boolean()
      })
    }),
    response: {
      200: z.object({
        conclued: z.boolean(),
        isActive: z.boolean(),
        userEmail: z.string().nullable(),
        id: z.string(),
        title: z.string(),
        description: z.string(),
        createdAt: z.string(),
        updatedAt: z.string(),
        socialLink: z.string().nullable(),
        heroPathUrl: z.string(),
        Gender: z.string().nullable(),
        Theme: z.string().nullable(),
        hits: z.number(),
        totalWords: z.number().nullable()
      }),
      500: z.object({
        message: z.string()
      })
    }
  }
}

export type TreateBookBodySchema = z.infer<(typeof createBookSchema.schema)['body']>
