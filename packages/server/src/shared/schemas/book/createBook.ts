import { z } from 'zod'
import { bookTag } from './getAllBooks'
import { throwBookMessages } from '@utils'

export const createBookSchema = {
  schema: {
    description: 'Criação de um novo livro para o usuário.',
    tags: [bookTag],
    body: z.object({
      book: z.object({
        title: z.string({
          required_error: throwBookMessages.bookWithoutTitle
        }),
        description: z.string({
          required_error: throwBookMessages.bookWithoutDescription
        }),
        Gender: z.string().nullable(),
        Theme: z.string().nullable(),
        heroPathUrl: z.string(),
        socialLink: z.string().nullable()
      })
    }),
    response: {
      201: z.object({
        conclued: z.boolean(),
        isActive: z.boolean(),
        id: z.string(),
        title: z.string(),
        description: z.string(),
        heroPathUrl: z.string(),
        Gender: z.string(),
        Theme: z.string(),
        hits: z.number(),
        totalWords: z.number()
      }),
      500: z.object({
        message: z.string()
      })
    }
  }
}

export type TreateBookBodySchemaRequest = z.infer<typeof createBookSchema.schema.body>
export type TreateBookBodySchemaReponse = z.infer<(typeof createBookSchema.schema.response)['201']>
