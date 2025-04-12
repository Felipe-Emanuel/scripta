import { Book, Reader } from '@prisma/client'
import { IReaderRepository } from '../ReaderRepository'
import { mockReader, bookEntitieMock } from '~/src/shared/mocks'
import { TCreateReaderSchemaResponse } from '@schemas'
import { TCreateReaderEntitie } from '~/src/services'

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

  const createReader = async (
    reader: TCreateReaderSchemaResponse
  ): Promise<TCreateReaderEntitie> => {
    const updatedReader = (baseReader = [
      ...baseReader,
      {
        ...baseReader[0],
        ...reader
      }
    ])

    return {
      ...updatedReader[0],
      bookId: bookEntitieMock.id
    }
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

  const getAllReadersByAuthor = async (authorId: string): Promise<Reader[]> => {
    const readers = baseReader.filter((reader) => reader.userId === authorId)

    return readers || []
  }

  return {
    createReader,
    getAllReadersByBook,
    updateReader,
    getAllReadersByAuthor,
    createOnlyBookReader
  }
}
