import { BookEntitie } from '@entities/Book'
import { throwBookMessages } from '@entities/Book/utils'
import { Book } from '@prisma/client'
import { IBooksRepository } from '@repositories'
import { TUpdateBookService } from '@types'

export type TUpdateBookServiceRequest = {
  action: Pick<IBooksRepository, 'updateBook'>
  bookId: string
  book: Book
}
export type TUpdateBookServiceResponse = Book

export const UpdateBookService = async ({
  action,
  bookId,
  book
}: TUpdateBookServiceRequest): Promise<TUpdateBookServiceResponse> => {
  const { updateBook } = action

  if (!bookId) throw new Error(throwBookMessages.missingBookId)

  const { updatedBook: update } = BookEntitie(book)

  const updatedBook: TUpdateBookService = {
    createdAt: book.createdAt,
    description: book.description,
    Gender: book.Gender,
    heroPathUrl: book.heroPathUrl,
    publishedUrl: book.publishedUrl,
    Theme: book.publishedUrl,
    title: book.title,
    totalWords: book.totalWords
  }

  const newBook = await update({
    ...updatedBook,
    ...book
  })

  await updateBook(bookId, newBook)

  return newBook || null
}
