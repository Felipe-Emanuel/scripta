import { z } from 'zod'
import { throwChapterMessages } from '@entities/Chapter/utils'

export const updateChapterServiceSchema = z.object({
  userEmail: z
    .string({
      required_error: throwChapterMessages.requiredEmail
    })
    .email(throwChapterMessages.invalidEmail)
})

export const updateChapterControllerSchema = z.object({
  updatedChapter: z.object({
    id: z.string().uuid(),
    chapterText: z.string(),
    lineHeight: z.string(),
    fontWeight: z.string(),
    fontSize: z.string(),
    firstLineIndent: z.string(),
    bookId: z.string()
  })
})

export const deleteChapterSchema = z.object({
  chapterId: z.string({
    required_error: throwChapterMessages.idRequired
  })
})
