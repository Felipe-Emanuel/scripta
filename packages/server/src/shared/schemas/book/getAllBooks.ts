import { z } from 'zod'
import { throwBookMessages } from '@utils'

export const bookTag = 'book'

export const getAllBooksSchema = {
  schema: {
    description: 'Resgata todos os livros de um usuário',
    tags: [bookTag],
    params: z.object({
      onlyFirstChapter: z.enum(['true', 'false'], {
        message: throwBookMessages.onlyFirstChapter
      })
    }),
    response: {
      200: z.array(
        z
          .object({
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
          .extend({
            chapters: z
              .array(
                z.object({
                  id: z.string(),
                  bookId: z.string(),
                  isConclued: z.boolean(),
                  chapterTitle: z.string(),
                  chapterText: z.string(),
                  wordsCounter: z.number(),
                  firstLineIndent: z.string(),
                  lineHeight: z.string(),
                  fontSize: z.string(),
                  fontWeight: z.string()
                })
              )
              .optional()
          })
      ),
      500: z.object({
        message: z.string()
      })
    }
  }
}

export type TGetAllBooksSchemaResponse = z.infer<
  (typeof getAllBooksSchema.schema.response)['200']
>[0] // 0 para pegar o tipo dentro do array da resposta
