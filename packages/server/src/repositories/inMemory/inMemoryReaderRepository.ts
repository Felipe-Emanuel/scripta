import { Book, Reader } from '@prisma/client'
import { bookEntitieMock } from '@entities/Book/mocks'
import { mockReader } from '@entities/Reader/mocks'
import { IReaderRepository } from '../ReaderRepository'
import { TFormattedUser } from '@types'

type TBookWithAccessByReader = {
  readers: Reader[]
} & Book

export const inMemoryReaderRepository = (): IReaderRepository => {
  let baseReader: Reader[] = []
  const books = [
    {
      ...bookEntitieMock,
      readers: [mockReader]
    }
  ] as TBookWithAccessByReader[]
  const users: TFormattedUser[] = [
    {
      ...mockReader,
      books
    }
  ]

  const createReader = async (reader: Reader): Promise<Reader> => {
    const updatedReader = (baseReader = [...baseReader, reader])

    return updatedReader[0] || null
  }

  const createOnlyBookReader = async (bookId: string, newReader: Reader): Promise<Reader[]> => {
    let existentReader = books[0].readers.find((book) => book.id === bookId)

    existentReader = newReader

    return [existentReader]
  }

  const getAllReadersByBook = async (bookId: string): Promise<Reader[]> => {
    const existentBook = books.find((book) => book.id === bookId)

    return existentBook?.readers || []
  }

  const updateReader = async (readerId: string, newReader: Reader): Promise<Reader> => {
    const existentReader = baseReader.find((reader) => reader.id === readerId)

    const updatedReader = {
      ...existentReader,
      ...newReader
    }

    return updatedReader
  }

  const getAllReadersByAuthor = async (authorEmail: string): Promise<Reader[]> => {
    const readers = baseReader.filter((reader) => reader.userEmail === authorEmail)

    return readers || []
  }

  const getReaderFromEmail = async (readerEmail: string): Promise<TFormattedUser> => {
    const existentUser = users.find((user) => user.userEmail === readerEmail)

    return existentUser || null
  }

  return {
    createReader,
    getAllReadersByBook,
    updateReader,
    getAllReadersByAuthor,
    createOnlyBookReader,
    getReaderFromEmail
  }
}
