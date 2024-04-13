import { Book } from '@prisma/client'
import { TBookWithCharacters } from '@types'
import { throwBookMessages } from './utils'
import { TUpdateBook } from 'src/shared/types/TUpdateBook'
import { isAllAttributeFilled } from '@utils'

export const BookEntitie = (book: Book) => {
  const setBook = async () => {
    if (!book.userEmail) throw new Error(throwBookMessages.bookWithoutUserEmail)

    if (!book.title) throw new Error(throwBookMessages.bookWithoutTitle)

    if (!book.description) throw new Error(throwBookMessages.bookWithoutDescription)

    return book
  }

  const getBookWithCharacters = async (bookWithCharacters: TBookWithCharacters) => {
    if (bookWithCharacters.characters.length) return bookWithCharacters

    throw new Error(throwBookMessages.bookWithoutCharacters)
  }

  const updatedBook = async (updatedBook: TUpdateBook) => {
    if (!isAllAttributeFilled(updatedBook)) throw new Error(throwBookMessages.areAllFieldsFilled)

    return updatedBook
  }

  const toggleIsActiveBook = async () => {
    return {
      ...book,
      isActive: !book.isActive
    }
  }

  const toggleIsConcluedBook = async () => {
    return {
      ...book,
      conclued: !book.conclued
    }
  }

  return {
    setBook,
    getBookWithCharacters,
    updatedBook,
    toggleIsActiveBook,
    toggleIsConcluedBook
  }
}
