import { z } from 'zod'
import { throwChapterMessages } from '@entities/Chapter/utils'

export const chapterTag = 'chapter'

export const createChapterSchema = {
  schema: {
    description: 'Cria um novo capítulo no livro do usuário.',
    tags: [chapterTag],
    params: z.object({
      userEmail: z.string().email({
        message: throwChapterMessages.requiredEmail
      })
    }),
    body: z.object({
      chapter: z.object({
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
    }),
    response: {
      500: z.object({
        message: z.string()
      }),
      200: z.object({
        message: z.string()
      }),
      201: z.object({
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
    }
  }
}
