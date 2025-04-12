import { TFastifyInstance } from '@types'
import { globalErrorMessage, throwReaderMessages, verifyToken } from '@utils'

import { authorization } from 'src/middlewares'

import {
  databaseBookRepository,
  databaseReaderRepository,
  databaseUserRepository
} from '@repositories'

import {
  CreateReaderService,
  GetBookByIdService,
  GetByUserIdService,
  GetReaderByAuthorService,
  GetReadersByBook,
  TCreateReaderRequest,
  TGetBookByIdServiceRequest,
  TGetByUserIdServiceRequest,
  TGetReaderByAuthorRequest,
  TGetReadersByBookRequest
} from '@services'

import { createReaderSchema, getReaderByAuthorSchema, getReadersByBookIdSchema } from '@schemas'

export async function readerController(app: TFastifyInstance) {
  const { createReader, getAllReadersByBook, getAllReadersByAuthor } = databaseReaderRepository()

  const { getBookById } = databaseBookRepository()
  const { getByUserId } = databaseUserRepository()

  const createReaderAction: TCreateReaderRequest['action'] = {
    createReader
  }

  const GetReadersByBookAction: TGetReadersByBookRequest['action'] = {
    getAllReadersByBook
  }

  const getReadersByAuthorAction: TGetReaderByAuthorRequest['action'] = {
    getAllReadersByAuthor
  }

  const getBookByIdServiceAction: TGetBookByIdServiceRequest['action'] = {
    getBookById
  }

  const getByUserIdAction: TGetByUserIdServiceRequest['action'] = {
    getByUserId
  }

  app.post(
    '/readers',
    {
      preHandler: async (req, reply) => {
        const accessToken = req.headers.authorization

        await authorization(accessToken, reply)
      },
      schema: createReaderSchema.schema
    },
    async (req, reply) => {
      const decoded = await verifyToken(req.headers.authorization)

      const readerId = decoded?.id

      const { bookId, location } = req.body

      const bookReedingByReader = await GetBookByIdService({
        action: getBookByIdServiceAction,
        bookId
      })

      const authorId = bookReedingByReader?.userId

      const existentReaders = await GetReaderByAuthorService({
        action: getReadersByAuthorAction,
        userId: authorId
      })

      const readerAlreadyExistis = existentReaders?.find((reader) => reader.id === readerId)

      if (readerAlreadyExistis)
        return reply.status(200).send({ message: throwReaderMessages.alreadyExists })

      const reader = await GetByUserIdService({
        action: getByUserIdAction,
        userid: readerId
      })

      const { latitude, longitude } = location

      const newReader = await CreateReaderService({
        action: createReaderAction,
        authorId,
        reader,
        body: {
          bookId: bookReedingByReader?.id,
          location: {
            latitude,
            longitude
          }
        }
      })

      try {
        return reply.status(201).send(newReader)
      } catch {
        reply.status(500).send({ message: globalErrorMessage.unexpected })
      }
    }
  )

  app.get(
    '/reader/:bookId',
    {
      preHandler: async (req, reply) => {
        const accessToken = req.headers.authorization

        await authorization(accessToken, reply)
      },
      schema: getReadersByBookIdSchema.schema
    },
    async (req, reply) => {
      const decoded = await verifyToken(req.headers.authorization)

      const { bookId } = req.params

      const readers = await GetReadersByBook({
        action: GetReadersByBookAction,
        bookId,
        authorId: decoded?.id
      })

      try {
        reply.send(readers)
      } catch {
        reply.status(500).send({ message: globalErrorMessage.unexpected })
      }
    }
  )

  app.get(
    '/getReaders',
    {
      preHandler: async (req, reply) => {
        const accessToken = req.headers.authorization

        await authorization(accessToken, reply)
      },
      schema: getReaderByAuthorSchema.schema
    },
    async (req, reply) => {
      const decoded = await verifyToken(req.headers.authorization)

      const readers = await GetReaderByAuthorService({
        action: getReadersByAuthorAction,
        userId: decoded?.id
      })

      try {
        reply.send(readers)
      } catch {
        reply.status(500).send({ message: globalErrorMessage.unexpected })
      }
    }
  )
}
