import { z } from 'zod'
import { throwReaderMessages } from '@utils'

export const readerTag = 'reader'

export const createReaderSchema = {
  schema: {
    description: 'Cria um leitor para um autor',
    tags: [readerTag],
    body: z.object({
      location: z.object({
        latitude: z.number({
          required_error: throwReaderMessages.invalidRegion
        }),
        longitude: z.number({
          required_error: throwReaderMessages.invalidRegion
        })
      }),
      bookId: z.string().uuid()
    }),
    response: {
      500: z.object({
        message: z.string()
      }),
      201: z.object({
        bookId: z.string(),
        picture: z.string().nullable(),
        userName: z.string(),
        latitude: z.number(),
        longitude: z.number()
      })
    }
  }
}

export type TCreateReaderSchemaResponse = z.infer<
  (typeof createReaderSchema.schema.response)['201']
>
export type TCreateReaderSchemaRequest = z.infer<typeof createReaderSchema.schema.body>
