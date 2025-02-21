import { z } from 'zod'
import { chapterTag } from './create'
import { throwBookMessages } from '@entities/Book/utils'

export const updateChapterSchema = {
  schema: {
    description: 'Atualiza as informações do livro',
    tags: [chapterTag],
    params: z.object({
      userEmail: z.string({
        required_error: throwBookMessages.emailMissing
      })
    }),
    body: z.object({
      updatedChapter: z.object({
        id: z.string().uuid(),
        chapterText: z.string(),
        lineHeight: z.string(),
        fontWeight: z.string(),
        fontSize: z.string(),
        firstLineIndent: z.string(),
        bookId: z.string()
      })
    }),
    response: {
      500: z.object({
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
