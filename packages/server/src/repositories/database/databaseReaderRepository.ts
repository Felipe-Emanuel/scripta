import { prisma } from 'src/lib'
import { IReaderRepository } from '../ReaderRepository'
import { Reader } from '@prisma/client'
import { TGetReaderByAuthorSchemaResponse } from '@schemas'
import { TCreateReaderEntitie } from '@services'

export const databaseReaderRepository = (): IReaderRepository => {
  const createReader = async (
    reader: Reader & { bookId: string }
  ): Promise<TCreateReaderEntitie> => {
    const newReader = await prisma.reader.create({
      data: {
        id: reader.id,
        userId: reader.userId,
        userName: reader.userName,
        latitude: reader.latitude,
        longitude: reader.longitude,
        books: {
          connect: { id: reader.bookId }
        }
      },
      include: {
        books: true
      }
    })

    return {
      id: newReader.id,
      picture: newReader.picture,
      bookId: reader.bookId,
      userId: newReader.userId,
      userName: newReader.userName,
      latitude: newReader.latitude,
      longitude: newReader.longitude
    }
  }

  const createOnlyBookReader = async (bookId: string, newReader: Reader): Promise<Reader[]> => {
    const updatedBook = await prisma.book.update({
      where: { id: bookId },
      data: {
        readers: {
          create: {
            ...newReader
          }
        }
      },
      include: {
        readers: true
      }
    })

    return updatedBook.readers || []
  }

  const getAllReadersByBook = async (bookId: string): Promise<Reader[]> => {
    const existentBook = await prisma.book.findFirst({
      where: {
        id: bookId
      },
      include: {
        readers: true
      }
    })
    return existentBook.readers || []
  }

  const updateReader = async (readerId: string, newReader: Reader): Promise<Reader> => {
    const updatedReader = await prisma.reader.update({
      where: {
        id: readerId
      },
      data: newReader
    })

    return updatedReader || null
  }

  const getAllReadersByAuthor = async (
    userId: string
  ): Promise<TGetReaderByAuthorSchemaResponse> => {
    const readers = await prisma.reader.findMany({
      where: {
        userId
      }
    })

    return readers?.map((reader) => ({
      id: reader.id,
      latitude: reader.latitude,
      longitude: reader.longitude,
      picture: reader.picture,
      userName: reader.userName
    }))
  }

  return {
    createReader,
    getAllReadersByBook,
    updateReader,
    getAllReadersByAuthor,
    createOnlyBookReader
  }
}
