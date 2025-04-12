import { z } from 'zod'
import { bookTag } from './getAllBooks'
import { throwBookMessages } from '@utils'

export const updateBoolsBookInfoSchema = {
  schema: {
    description: 'Atualiza as informações booleanas (concluído e ativo) do livro',
    tags: [bookTag],
    params: z.object({
      bookId: z.string({
        required_error: throwBookMessages.missingBookId
      })
    }),
    body: z.object({
      where: z.enum(['conclued', 'isActive'], {
        message: throwBookMessages.where
      })
    }),
    response: {
      500: z.object({
        message: z.string()
      }),
      401: z.object({
        message: z.string()
      }),
      202: z.object({
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
    }
  }
}

export type TUpdateBoolsBookInfoSchemaResponse = z.infer<
  (typeof updateBoolsBookInfoSchema.schema.response)['202']
>
