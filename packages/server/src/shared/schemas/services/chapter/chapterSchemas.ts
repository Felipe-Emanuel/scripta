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

export const deleteChapterParamSchema = z.object({
  chapterId: z.string({
    required_error: throwChapterMessages.idRequired
  })
})

export const chapterSchema = z.object({
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
