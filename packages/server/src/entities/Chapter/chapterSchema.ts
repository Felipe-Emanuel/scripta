import { z } from 'zod'
import { constants, throwChapterMessages } from './utils'

const {
  MAX_WORDS_BY_CHAPTER,
  MIN_WORDS_BY_CHAPTER,
  MIN_CHAPTER_TITLE_CHARACTERS,
  MAX_CHAPTER_TITLE_CHARACTERS
} = constants

export const chapterSchema = z.object({
  bookId: z.string().uuid(),
  chapterText: z.string({
    required_error: throwChapterMessages.minLength
  }),
  wordsCounter: z
    .number({
      invalid_type_error: throwChapterMessages.wrongWordsCounter,
      required_error: throwChapterMessages.minLength
    })
    .min(MIN_WORDS_BY_CHAPTER, throwChapterMessages.minLength)
    .max(MAX_WORDS_BY_CHAPTER, throwChapterMessages.maxLength),
  chapterTitle: z
    .string({
      required_error: throwChapterMessages.minLengthTitle
    })
    .min(MIN_CHAPTER_TITLE_CHARACTERS, throwChapterMessages.minLengthTitle)
    .max(MAX_CHAPTER_TITLE_CHARACTERS, throwChapterMessages.maxLengthTitle),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
  id: z.string().uuid()
})

export type TChapterSchema = z.infer<typeof chapterSchema>
