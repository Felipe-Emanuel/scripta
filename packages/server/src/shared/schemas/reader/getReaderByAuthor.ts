import { z } from 'zod'
import { readerTag } from './create'

export const getReaderByAuthorSchema = {
  schema: {
    description: 'Recupera todos os leitores de um autor independente do livro.',
    tags: [readerTag],
    response: {
      500: z.object({
        message: z.string()
      }),
      200: z.array(
        z.object({
          id: z.string().optional(),
          picture: z.string().nullable(),
          userName: z.string(),
          latitude: z.number(),
          longitude: z.number()
        })
      )
    }
  }
}

export type TGetReaderByAuthorSchemaResponse = z.infer<
  (typeof getReaderByAuthorSchema.schema.response)['200']
>
