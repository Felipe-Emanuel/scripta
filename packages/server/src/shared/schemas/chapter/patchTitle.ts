import { z } from 'zod'
import { chapterTag } from './create'
import { throwChapterMessages } from '@utils'

export const patchTitleSchema = {
  schema: {
    description: 'Atualiza o título do capítulo.',
    tags: [chapterTag],
    params: z.object({
      chapterId: z
        .string({
          required_error: throwChapterMessages.notFound
        })
        .uuid(throwChapterMessages.notFound)
    }),
    body: z.object({
      title: z.string({
        required_error: throwChapterMessages.titleRequired
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

export type TPatchTitleSchemaRequest = z.infer<typeof patchTitleSchema.schema.body>
export type TPatchTitleSchemaResponse = z.infer<(typeof patchTitleSchema.schema.response)['201']>
