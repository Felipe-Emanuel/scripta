import { Book } from '@prisma/client'
import { TGetAllBooksServiceResponse, TUpdateBookServiceResponse } from '@services'
import {
  TreateBookBodySchemaReponse,
  TreateBookBodySchemaRequest,
  TUpdateBookInfoSchemaResponse
} from '@schemas'

export interface IBooksRepository {
  createBook: (
    book: TreateBookBodySchemaRequest['book'],
    authorId: string
  ) => Promise<TreateBookBodySchemaReponse>
  getAllBooks: (authorId: string, onlyFirstChapter: boolean) => Promise<TGetAllBooksServiceResponse>
  deleteBook: (bookId: string) => Promise<Book>
  toggleIsActiveBook: (bookId: string) => Promise<Book>
  toggleConcluedBook: (bookId: string) => Promise<Book>
  updateBook: (
    bookId: string,
    updatedBook: TUpdateBookServiceResponse
  ) => Promise<TUpdateBookInfoSchemaResponse>
  getBookById: (bookId: string) => Promise<Book>
}
