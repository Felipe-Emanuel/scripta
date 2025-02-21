import { TFastifyInstance } from '@types'
import { globalErrorMessage } from '@utils'

import { authorization } from 'src/middlewares'

import { throwReaderMessages } from '@entities/Reader/utils'
import { databaseReaderRepository, databaseUserRepository } from '@repositories'

import {
  CreateReaderService,
  GetReaderByAuthorService,
  GetReaderByBook,
  GetReaderByEmailService,
  GetUserByEmailService,
  TCreateReaderRequest,
  TGetByEmailRequest,
  TGetReaderByAuthorRequest,
  TGetReaderByBookRequest,
  TGetReaderByEmailRequest,
  TUpdateReaderRequest,
  UpdateReaderService
} from '@services'
import {
  createReaderSchema,
  getReaderByAuthorSchema,
  getReaderByBookIdSchema,
  getReaderByEmailSchema,
  updateReaderSchema
} from '@schemas'

export async function readerController(app: TFastifyInstance) {
  const {
    createReader,
    getAllReadersByBook,
    updateReader,
    getAllReadersByAuthor,
    getReaderFromEmail
  } = databaseReaderRepository()

  const { getUserByEmail } = databaseUserRepository()

  const createReaderAction: TCreateReaderRequest['action'] = {
    createReader
  }

  const getReaderByBookAction: TGetReaderByBookRequest['action'] = {
    getAllReadersByBook
  }

  const updateReaderAction: TUpdateReaderRequest['action'] = {
    updateReader
  }

  const getReadersByAuthorAction: TGetReaderByAuthorRequest['action'] = {
    getAllReadersByAuthor
  }

  const getReaderByEmailAction: TGetReaderByEmailRequest['action'] = {
    getReaderFromEmail
  }

  const getUserByEmailAction: TGetByEmailRequest['action'] = {
    getUserByEmail
  }

  app.post(
    '/readers',
    {
      preHandler: async (req, reply) => {
        const provider = req.headers.provider
        const accessToken = req.headers.authorization

        await authorization(provider, accessToken, reply)
      },
      schema: createReaderSchema.schema
    },
    async (req, apply) => {
      const { userEmail, location, picture, portfolioUrl, userName, authorEmail } = req.body

      const author = await GetUserByEmailService({
        action: getUserByEmailAction,
        email: authorEmail,
        includeBook: false,
        includeReaders: true
      })

      const existentReader = author?.readers?.find((reader) => reader.userEmail === userEmail)

      if (existentReader) {
        return apply.send({ message: throwReaderMessages.alreadyExists })
      }

      const { latitude, longitude } = location

      const newReader = await CreateReaderService({
        action: createReaderAction,
        userEmail,
        location: { latitude, longitude },
        picture,
        portfolioUrl,
        userName,
        authorEmail
      })

      try {
        return apply.status(201).send(newReader)
      } catch {
        apply.status(500).send({ message: globalErrorMessage.unexpected })
      }
    }
  )

  app.get(
    '/reader/:email/:bookId',
    {
      preHandler: async (req, reply) => {
        const provider = req.headers.provider
        const accessToken = req.headers.authorization

        await authorization(provider, accessToken, reply)
      },
      schema: getReaderByBookIdSchema.schema
    },
    async (req, apply) => {
      const { email, bookId } = req.params

      const readers = await GetReaderByBook({
        action: getReaderByBookAction,
        bookId,
        email
      })

      try {
        apply.send(readers)
      } catch {
        apply.status(500).send({ message: globalErrorMessage.unexpected })
      }
    }
  )

  app.put(
    '/reader/:email/:readerId',
    {
      preHandler: async (req, reply) => {
        const provider = req.headers.provider
        const accessToken = req.headers.authorization

        await authorization(provider, accessToken, reply)
      },
      schema: updateReaderSchema.schema
    },
    async (req, apply) => {
      const { email, readerId } = req.params
      const { newReader } = req.body

      const {
        authorEmail,
        createdAt,
        id,
        latitude,
        longitude,
        picture,
        portfolioUrl,
        updatedAt,
        userEmail,
        userName
      } = newReader

      const readers = await UpdateReaderService({
        action: updateReaderAction,
        newReader: {
          authorEmail,
          id,
          latitude,
          longitude,
          picture,
          portfolioUrl,
          createdAt: new Date(createdAt),
          updatedAt: new Date(updatedAt),
          userEmail,
          userName
        },
        email,
        readerId
      })

      try {
        apply.send(readers)
      } catch {
        apply.status(500).send({ message: globalErrorMessage.unexpected })
      }
    }
  )

  app.get(
    '/reader/:readerEmail',
    {
      preHandler: async (req, reply) => {
        const provider = req.headers.provider
        const accessToken = req.headers.authorization

        await authorization(provider, accessToken, reply)
      },
      schema: getReaderByEmailSchema.schema
    },
    async (req, apply) => {
      const { readerEmail } = req.params

      const existentReader = await GetReaderByEmailService({
        action: getReaderByEmailAction,
        readerEmail
      })

      try {
        apply.status(200).send(existentReader)
      } catch {
        apply.status(500).send({ message: globalErrorMessage.unexpected })
      }
    }
  )

  app.get(
    '/getReaders/:authorEmail',
    {
      preHandler: async (req, reply) => {
        const provider = req.headers.provider
        const accessToken = req.headers.authorization

        await authorization(provider, accessToken, reply)
      },
      schema: getReaderByAuthorSchema.schema
    },
    async (req, apply) => {
      const { authorEmail } = req.params

      const readers = await GetReaderByAuthorService({
        action: getReadersByAuthorAction,
        authorEmail
      })

      try {
        apply.send(readers)
      } catch {
        apply.status(500).send({ message: globalErrorMessage.unexpected })
      }
    }
  )
}
