import { z } from 'zod'

export const chapterTag = 'chapter'

export const createChapterSchema = {
  schema: {
    description: 'Cria um novo capítulo no livro do usuário.',
    tags: [chapterTag],
    body: z.object({
      chapter: z.object({
        bookId: z.string(),
        chapterText: z.string(),
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

export type TCreateChapterSchemaBody = z.infer<typeof createChapterSchema.schema.body>
export type TCreateChapterSchemaResponse = z.infer<
  (typeof createChapterSchema.schema.response)['201']
>
