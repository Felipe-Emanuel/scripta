import { z } from 'zod'
import { bookTag } from './getAllBooks'
import { throwBookMessages } from '~/src/entities/Book/utils'

export const getBookByIdSchema = {
  schema: {
    description: 'Recupera as informações de um único livro do usuário.',
    tags: [bookTag],
    params: z.object({
      userEmail: z.string({
        required_error: throwBookMessages.emailMissing
      }),
      bookId: z.string({
        required_error: throwBookMessages.missingBookId
      })
    }),
    response: {
      500: z.object({
        message: z.string()
      }),
      200: z
        .object({
          conclued: z.boolean(),
          isActive: z.boolean(),
          userEmail: z.string().nullable(),
          id: z.string(),
          title: z.string(),
          description: z.string(),
          createdAt: z.date(),
          updatedAt: z.date(),
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
                createdAt: z.date(),
                updatedAt: z.date(),
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
    }
  }
}
