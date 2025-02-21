import { z } from 'zod'
import { throwBookMessages } from '@entities/Book/utils'

export const bookSchema = z.object({
  conclued: z.boolean(),
  isActive: z.boolean(),
  userEmail: z.string().nullable(),
  id: z.string(),
  title: z.string(),
  description: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  socialLink: z.string().nullable(),
  heroPathUrl: z.string(),
  Gender: z.string().nullable(),
  Theme: z.string().nullable(),
  hits: z.number(),
  totalWords: z.number().nullable()
})

export const bookByIdSchema = z.object({
  bookId: z
    .string({
      required_error: throwBookMessages.missingBookId
    })
    .uuid(throwBookMessages.missingBookId),
  userEmail: z.string().email({
    message: throwBookMessages.emailMissing
  })
})
