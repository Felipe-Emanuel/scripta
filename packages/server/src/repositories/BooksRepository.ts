import { Book } from '@prisma/client'

export interface IBooksRepository {
  createBook: (book: Book) => Promise<Book[]>
  findBookWithExistingTitle: (title: string) => Promise<Book | null>
}
