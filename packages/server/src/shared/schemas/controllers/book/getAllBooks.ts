import { z } from 'zod'
import { throwBookMessages } from '~/src/entities/Book/utils'

export const bookTag = 'book'

export const getAllBooksSchema = {
  schema: {
    description: 'Resgata todos os livros de um usuário',
    tags: [bookTag],
    params: z.object({
      userEmail: z.string({
        required_error: throwBookMessages.emailMissing
      }),
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
          })
          .extend({
            chapters: z
              .array(
                z.object({
                  id: z.string(),
                  createdAt: z.string(),
                  updatedAt: z.string(),
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
