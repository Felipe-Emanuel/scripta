import { z } from 'zod'
import { bookTag } from './getAllBooks'
import { throwBookMessages } from '@utils'

export const getBookByIdSchema = {
  schema: {
    description: 'Recupera as informações de um único livro do usuário.',
    tags: [bookTag],
    params: z.object({
      bookId: z.string({
        required_error: throwBookMessages.missingBookId
      })
    }),
    response: {
      500: z.object({
        message: z.string()
      }),
      200: z.object({
        conclued: z.boolean(),
        isActive: z.boolean(),
        id: z.string(),
        title: z.string(),
        description: z.string(),
        socialLink: z.string().nullable(),
        heroPathUrl: z.string(),
        Gender: z.string().nullable(),
        Theme: z.string().nullable(),
        hits: z.number(),
        totalWords: z.number().nullable()
      })
    }
  }
}

export type TGetBookByIdSchemaResponse = z.infer<(typeof getBookByIdSchema.schema.response)['200']>
