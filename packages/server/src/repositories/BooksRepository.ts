import { Book } from '@prisma/client'

export interface IBooksRepository {
  createBook: (book: Book, userEmail: string) => Promise<Book[]>
  getAllBooks: (userEmail: string) => Promise<Book[]>
  deleteBook: (bookId: string) => Promise<Book>
}
