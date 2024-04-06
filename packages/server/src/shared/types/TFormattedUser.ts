import { Book, Reader } from '@prisma/client'

export type TFormattedUser = {
  books: Book[]
} & Reader
