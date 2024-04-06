import { prisma } from 'src/lib'
import { IReaderRepository } from '../ReaderRepository'
import { Reader } from '@prisma/client'
import { TFormattedUser } from '@types'

export const databaseReaderRepository = (): IReaderRepository => {
  const createReader = async (
    reader: Reader & { bookId: string },
  ): Promise<Reader> => {
    const newReader = await prisma.reader.create({
      data: reader,
      include: {
        books: true,
      },
    })

    return newReader
  }

  const createOnlyBookReader = async (
    bookId: string,
    newReader: Reader,
  ): Promise<Reader[]> => {
    const updatedBook = await prisma.book.update({
      where: { id: bookId },
      data: {
        readers: {
          create: {
            ...newReader,
          },
        },
      },
      include: {
        readers: true,
      },
    })

    return updatedBook.readers || []
  }

  const getAllReadersByBook = async (bookId: string): Promise<Reader[]> => {
    const existentBook = await prisma.book.findFirst({
      where: {
        id: bookId,
      },
      include: {
        readers: true,
      },
    })
    return existentBook.readers || []
  }

  const updateReader = async (
    readerId: string,
    newReader: Reader,
  ): Promise<Reader> => {
    const updatedReader = await prisma.reader.update({
      where: {
        id: readerId,
      },
      data: newReader,
    })

    return updatedReader || null
  }

  const getAllReadersByAuthor = async (
    authorEmail: string,
  ): Promise<Reader[]> => {
    const readers = await prisma.reader.findMany({
      where: {
        authorEmail,
      },
    })

    return readers || []
  }

  const getReaderFromEmail = async (
    readerEmail: string,
  ): Promise<TFormattedUser> => {
    const existentReader = await prisma.reader.findFirst({
      where: {
        userEmail: readerEmail,
      },
      include: {
        books: true,
      },
    })

    return existentReader
  }

  return {
    createReader,
    getAllReadersByBook,
    updateReader,
    getAllReadersByAuthor,
    createOnlyBookReader,
    getReaderFromEmail,
  }
}
