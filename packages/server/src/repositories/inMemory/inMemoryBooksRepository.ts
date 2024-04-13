import { Book } from '@prisma/client'
import { IBooksRepository } from '../BooksRepository'

let books: Book[] = []

export const inMemoryBooksRepository = (): IBooksRepository => {
  const createBook = async (book: Book): Promise<Book[]> => {
    const updatedBooks = (books = [{ ...books, ...book }])
    return updatedBooks
  }

  const getAllBooks = async (userEmail: string): Promise<Book[]> => {
    const allBooks = books.filter((book) => book.userEmail === userEmail)

    return allBooks
  }

  const deleteBook = async (bookId: string): Promise<Book> =>
    books.filter((book) => book.id === bookId)[0]

  const toggleIsActiveBook = async (bookId: string): Promise<Book> => {
    const existentBook = books.find((book) => book.id === bookId)

    const patchedBook = {
      ...existentBook,
      isActive: !existentBook.isActive
    }

    return patchedBook || null
  }

  const toggleConcluedBook = async (bookId: string): Promise<Book> => {
    const existentBook = books.find((book) => book.id === bookId)

    const patchedBook = {
      ...existentBook,
      conclued: !existentBook.conclued
    }

    return patchedBook || null
  }

  return {
    createBook,
    getAllBooks,
    deleteBook,
    toggleIsActiveBook,
    toggleConcluedBook
  }
}
