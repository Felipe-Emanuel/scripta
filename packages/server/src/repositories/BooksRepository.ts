import { Book } from '@prisma/client'
import { TUpdateBookService } from '@types'

export interface IBooksRepository {
  createBook: (book: Book, userEmail: string) => Promise<Book[]>
  getAllBooks: (userEmail: string) => Promise<Book[]>
  deleteBook: (bookId: string) => Promise<Book>
  toggleIsActiveBook: (bookId: string) => Promise<Book>
  toggleConcluedBook: (bookId: string) => Promise<Book>
  updateBook: (bookId: string, updatedBook: TUpdateBookService) => Promise<Book>
}
