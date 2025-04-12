import { z } from 'zod'
import { bookTag } from './getAllBooks'
import { throwBookMessages } from '@utils'

export const deleteBookSchema = {
  schema: {
    description: 'Deleta um livro do usuário.',
    tags: [bookTag],
    params: z.object({
      bookId: z.string({
        required_error: throwBookMessages.missingBookId
      })
    }),
    response: {
      404: z.object({
        message: z.string()
      }),
      500: z.object({
        message: z.string()
      }),
      202: z.object({
        message: z.string(),
        deletedBook: z.object({
          title: z.string(),
          description: z.string(),
          id: z.string(),
          socialLink: z.string().nullable(),
          heroPathUrl: z.string(),
          conclued: z.boolean(),
          isActive: z.boolean(),
          Gender: z.string().nullable(),
          Theme: z.string().nullable(),
          hits: z.number(),
          totalWords: z.number().nullable()
        })
      })
    }
  }
}

export type TDeleteBookSchemaResponse = z.infer<(typeof deleteBookSchema.schema.response)['202']>
