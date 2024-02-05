import { Book } from '@prisma/client'
import { IBooksRepository } from '../BooksRepository'

let books: Book[] = []

export const inMemoryBooksRepository = (): IBooksRepository => {
  const createBook = async (book: Book): Promise<Book[]> => {
    const updatedBooks = (books = [{ ...book, ...book }])
    return updatedBooks
  }

  const findBookWithExistingTitle = async (
    title: string,
  ): Promise<Book | null> => {
    const existingBook = books.find((book) => book.title === title)
    return existingBook || null
  }

  return {
    createBook,
    findBookWithExistingTitle,
  }
}
