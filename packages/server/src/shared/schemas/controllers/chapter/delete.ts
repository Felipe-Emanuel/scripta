import { z } from 'zod'
import { chapterTag } from './create'
import { throwChapterMessages } from '@entities/Chapter/utils'

export const deleteChapterSchema = {
  schema: {
    description: 'Deleta um capítulo.',
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
      201: z.string()
    }
  }
}
