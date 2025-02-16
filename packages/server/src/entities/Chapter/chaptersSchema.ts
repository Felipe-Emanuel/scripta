import { z } from 'zod'
import { throwChapterMessages } from './utils'

export const chaptersSchema = z.object({
  bookId: z
    .string({
      required_error: throwChapterMessages.notFound
    })
    .uuid(throwChapterMessages.notFound)
})

export const chapterByIdSchema = z.object({
  chapterId: z.string({
    required_error: throwChapterMessages.notFound
  })
})

export const chapterTitleSchema = z.object({
  title: z.string({
    required_error: throwChapterMessages.titleRequired
  })
})

export type TChaptersSchema = z.infer<typeof chaptersSchema>
export type TChapterByIdSchema = z.infer<typeof chapterByIdSchema>
