import { FastifyInstance } from 'fastify'

import { databaseReaderRepository, databaseUserRepository } from '@repositories'
import { globalErrorMessage } from '@utils'
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
import { throwReaderMessages } from '@entities/Reader/utils'
import { authorization } from 'src/middlewares'

export async function readerController(app: FastifyInstance) {
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

  app.post('/readers', async (req, apply) => {
    const { userEmail, location, picture, portfolioUrl, userName, authorEmail } =
      req.body as Partial<TCreateReaderRequest>
    const provider = req.headers.provider
    const accessToken = req.headers.authorization

    await authorization(provider, accessToken, apply)

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

    try {
      const newReader = await CreateReaderService({
        action: createReaderAction,
        userEmail,
        location,
        picture,
        portfolioUrl,
        userName,
        authorEmail
      })
      // envia notificação de novo leitor para o usuário, informando o livro que ele acessou
      return apply.send(newReader)
    } catch {
      apply.status(500).send({ message: globalErrorMessage.unexpected })
    }
  })

  app.get('/reader/:email/:bookId', async (req, apply) => {
    const { email, bookId } = req.params as Partial<TGetReaderByBookRequest>
    const provider = req.headers.provider
    const accessToken = req.headers.authorization

    await authorization(provider, accessToken, apply)

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
  })

  app.put('/reader/:email/:readerId', async (req, apply) => {
    const { email, readerId } = req.params as Partial<TUpdateReaderRequest>
    const { newReader } = req.body as Partial<TUpdateReaderRequest>
    const provider = req.headers.provider
    const accessToken = req.headers.authorization

    await authorization(provider, accessToken, apply)

    const readers = await UpdateReaderService({
      action: updateReaderAction,
      newReader,
      email,
      readerId
    })

    try {
      apply.send(readers)
    } catch {
      apply.status(500).send({ message: globalErrorMessage.unexpected })
    }
  })

  app.get('/reader/:readerEmail', async (req, apply) => {
    const { readerEmail } = req.params as Partial<TGetReaderByEmailRequest>
    const provider = req.headers.provider
    const accessToken = req.headers.authorization

    await authorization(provider, accessToken, apply)

    const existentReader = await GetReaderByEmailService({
      action: getReaderByEmailAction,
      readerEmail
    })

    try {
      apply.send(existentReader)
    } catch {
      apply.status(500).send({ message: globalErrorMessage.unexpected })
    }
  })

  app.get('/getReaders/:authorEmail', async (req, apply) => {
    const { authorEmail } = req.params as Partial<TGetReaderByAuthorRequest>
    const provider = req.headers.provider
    const accessToken = req.headers.authorization

    await authorization(provider, accessToken, apply)

    const readers = await GetReaderByAuthorService({
      action: getReadersByAuthorAction,
      authorEmail
    })

    try {
      apply.send(readers)
    } catch {
      apply.status(500).send({ message: globalErrorMessage.unexpected })
    }
  })
}
