import { z } from 'zod'
import { chapterTag } from './create'

export const updateChapterSchema = {
  schema: {
    description: 'Atualiza as informações do livro.',
    tags: [chapterTag],
    body: z.object({
      updatedChapter: z.object({
        id: z.string().uuid(),
        bookId: z.string().uuid(),
        chapterText: z.string(),
        lineHeight: z.string(),
        fontWeight: z.string(),
        fontSize: z.string(),
        firstLineIndent: z.string()
      })
    }),
    response: {
      500: z.object({
        message: z.string()
      }),
      201: z.object({
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
    }
  }
}

export type TUpdateChapterSchemaRequest = z.infer<typeof updateChapterSchema.schema.body>
export type TUpdateChapterSchemaResponse = z.infer<
  (typeof updateChapterSchema.schema.response)['201']
>
