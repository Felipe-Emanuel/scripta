import { Book } from '@prisma/client'
import { TBookWithCharacters } from '@types'
import { throwMessages } from './utils'
import { TUpdateBook } from 'src/shared/types/TUpdateBook'
import { isAllAttributeFilled } from '@utils'

export const BookEntitie = (book: Book) => {
  const setBook = async () => {
    if (!book.userId) throw new Error(throwMessages.bookWithoutUserId)

    return book
  }

  const getBookWithCharacters = async (
    bookWithCharacters: TBookWithCharacters,
  ) => {
    if (bookWithCharacters.characters.length) return bookWithCharacters

    throw new Error(throwMessages.bookWithoutCharacters)
  }

  const updatedBook = async (updatedBook: TUpdateBook) => {
    if (!isAllAttributeFilled(updatedBook))
      throw new Error(throwMessages.areAllFieldsFilled)

    return updatedBook
  }

  return {
    setBook,
    getBookWithCharacters,
    updatedBook,
  }
}
