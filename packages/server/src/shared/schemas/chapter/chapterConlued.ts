import { z } from 'zod'
import { chapterTag } from './create'
import { throwChapterMessages } from '@utils'

export const chapterConluedSchema = {
  schema: {
    description: 'Atualiza status de conclusão do capítulo para ser listado para o leitor.',
    tags: [chapterTag],
    params: z.object({
      chapterId: z
        .string({
          required_error: throwChapterMessages.notFound
        })
        .uuid(throwChapterMessages.notFound)
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

export type TChapterConluedSchemaResponse = z.infer<
  (typeof chapterConluedSchema.schema.response)['201']
>
