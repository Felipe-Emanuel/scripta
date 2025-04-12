import { z } from 'zod'
import { bookTag } from './getAllBooks'
import { isLink, throwBookMessages } from '@utils'

export const updateBookInfoSchema = {
  schema: {
    description: 'Atualiza as informações do livro',
    tags: [bookTag],
    params: z.object({
      bookId: z.string({
        required_error: throwBookMessages.missingBookId
      })
    }),
    body: z.object({
      book: z.object({
        description: z.string(),
        Gender: z.string().nullable(),
        heroPathUrl: z.string(),
        socialLink: z
          .string()
          .nullable()
          .refine((value) => value && !isLink(value), {
            message: throwBookMessages.invalidSocialLink
          }),
        Theme: z.string().nullable(),
        title: z.string(),
        totalWords: z.number().nullable()
      })
    }),
    response: {
      500: z.object({
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

export type TUpdateBookInfoSchemaBody = z.infer<typeof updateBookInfoSchema.schema.body>
export type TUpdateBookInfoSchemaResponse = z.infer<
  (typeof updateBookInfoSchema.schema.response)['202']
>
