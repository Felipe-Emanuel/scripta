import { z } from 'zod'
import { readerTag } from './create'

export const getReadersByBookIdSchema = {
  schema: {
    description: 'Recupera os leitores do autor com base no id do livro selecionado',
    tags: [readerTag],
    params: z.object({
      bookId: z.string().uuid()
    }),
    response: {
      500: z.object({
        message: z.string()
      }),
      200: z.array(
        z.object({
          picture: z.string().nullable(),
          userName: z.string(),
          latitude: z.number(),
          longitude: z.number()
        })
      )
    }
  }
}

export type TGetReadersByBookIdSchemaResponse = z.infer<
  (typeof getReadersByBookIdSchema.schema.response)['200']
>
