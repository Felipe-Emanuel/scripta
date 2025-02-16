import { z } from 'zod'
import { throwBookMessages } from '.'

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
