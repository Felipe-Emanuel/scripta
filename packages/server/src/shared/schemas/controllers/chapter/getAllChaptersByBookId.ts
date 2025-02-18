import { z } from 'zod'
import { chapterTag } from './create'
import { throwChapterMessages } from '@entities/Chapter/utils'

export const getAllChaptersByBookIdSchema = {
  schema: {
    description: 'Recupera todos os capítulos de um livro específico.',
    tags: [chapterTag],
    params: z.object({
      bookId: z
        .string({
          required_error: throwChapterMessages.notFound
        })
        .uuid(throwChapterMessages.notFound)
    }),
    response: {
      500: z.object({
        message: z.string()
      }),
      200: z.array(
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
    }
  }
}
