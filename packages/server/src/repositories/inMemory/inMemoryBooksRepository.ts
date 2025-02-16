import { Book } from '@prisma/client'
import { IBooksRepository } from '../BooksRepository'
import { TUpdateBookService } from '@types'
import { TGetAllBooksServiceResponse, BookWithChapters } from '~/src/services'

let books: Book[] = []

export const inMemoryBooksRepository = (): IBooksRepository => {
  const createBook = async (book: Book): Promise<Book[]> => {
    const updatedBooks = (books = [{ ...books, ...book }])
    return updatedBooks
  }

  const getAllBooks = async (
    userEmail: string,
    onlyFirstChapter = false
  ): Promise<TGetAllBooksServiceResponse> => {
    const allBooks = books.filter(
      (book) => book.userEmail === userEmail
    ) as unknown as BookWithChapters[]

    if (onlyFirstChapter) {
      return allBooks.map((book) => ({
        ...book,
        chapters: book.chapters ? [book.chapters[0]] : []
      }))
    }

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

  const updateBook = async (bookId: string, updatedBook: TUpdateBookService): Promise<Book> => {
    const existentBook = books.find((book) => book.id === bookId)

    return {
      ...existentBook,
      ...updatedBook
    }
  }

  return {
    createBook,
    getAllBooks,
    deleteBook,
    toggleIsActiveBook,
    toggleConcluedBook,
    updateBook
  }
}
