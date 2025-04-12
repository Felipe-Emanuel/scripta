import { Book } from '@prisma/client'
import { IBooksRepository } from '../BooksRepository'
import { TUpdateBookService } from '@types'
import { TGetAllBooksServiceResponse } from '@services'
import {
  TGetAllBooksSchemaResponse,
  TreateBookBodySchemaReponse,
  TreateBookBodySchemaRequest
} from '@schemas'

let books: Book[] = []

export const inMemoryBooksRepository = (): IBooksRepository => {
  const createBook = async (
    book: TreateBookBodySchemaRequest['book']
  ): Promise<TreateBookBodySchemaReponse> => {
    books = [
      ...books,
      {
        ...books[0],
        ...book
      }
    ]
    return book
  }

  const getAllBooks = async (
    authorId: string,
    onlyFirstChapter = false
  ): Promise<TGetAllBooksServiceResponse> => {
    const allBooks = books.filter(
      (book) => book.userId === authorId
    ) as unknown as TGetAllBooksSchemaResponse[]

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

  const getBookById = async (bookId: string): Promise<Book | null> => {
    return books.find((book) => book.id === bookId) || null
  }

  return {
    createBook,
    getAllBooks,
    deleteBook,
    toggleIsActiveBook,
    toggleConcluedBook,
    updateBook,
    getBookById
  }
}
