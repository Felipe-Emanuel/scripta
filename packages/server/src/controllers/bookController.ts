import { globalErrorMessage, validateUserByBookId, verifyToken } from '@utils'
import { TFastifyInstance } from '@types'
import { databaseBookRepository } from '@repositories'
import { authorization } from 'src/middlewares'
import { CreateBookCoverService } from '../services/bookCover/create'

import {
  CreateBookService,
  TCreateBookServiceRequest,
  GetAllBooksService,
  TGetAllBooksServiceRequest,
  DeleteBookService,
  TDeleteBookServiceRequest,
  PatchActiveBookService,
  IPatchActiveBookServiceRequest,
  UpdateBookService,
  TUpdateBookServiceRequest,
  GetBookByIdService,
  PatchConcluedBookService,
  IPatchConcluedBookServiceRequest,
  TGetBookByIdServiceRequest
} from '@services'

import {
  createBookSchema,
  deleteBookSchema,
  getAllBooksSchema,
  getBookByIdSchema,
  updateBookInfoSchema,
  updateBoolsBookInfoSchema
} from '@schemas'

export async function bookController(app: TFastifyInstance): Promise<void> {
  const {
    getAllBooks,
    createBook,
    deleteBook,
    toggleIsActiveBook,
    toggleConcluedBook,
    updateBook,
    getBookById
  } = databaseBookRepository()

  const actionGetAllBooks: TGetAllBooksServiceRequest['action'] = {
    getAllBooks
  }

  const actionCreateBook: TCreateBookServiceRequest['actions'] = {
    createBook,
    getAllBooks
  }

  const deleteBookAction: TDeleteBookServiceRequest['action'] = {
    deleteBook
  }

  const patchActiveBookAction: IPatchActiveBookServiceRequest['action'] = {
    toggleIsActiveBook
  }

  const patchConcluedBookAction: IPatchConcluedBookServiceRequest['action'] = {
    toggleConcluedBook
  }

  const updateBookAction: TUpdateBookServiceRequest['action'] = {
    updateBook
  }

  const getBookByIdAction: TGetBookByIdServiceRequest['action'] = {
    getBookById
  }

  app.get(
    '/allBooks/:onlyFirstChapter',
    {
      preHandler: async (req, reply) => {
        const accessToken = req.headers.authorization
        await authorization(accessToken, reply)
      },
      schema: getAllBooksSchema.schema
    },
    async (req, reply) => {
      const decoded = await verifyToken(req.headers.authorization)

      const { onlyFirstChapter } = req.params

      const isFirstChapterOnly = onlyFirstChapter === 'true'

      const books = await GetAllBooksService({
        action: actionGetAllBooks,
        userid: decoded?.id,
        onlyFirstChapter: isFirstChapterOnly
      })

      try {
        reply.send(books)
      } catch (err) {
        reply.status(500).send({ message: globalErrorMessage.unexpected })
      }
    }
  )

  app.get('/books/:bookId', getBookByIdSchema, async (req, reply) => {
    try {
      const { bookId } = req.params

      const books = await GetBookByIdService({
        action: getBookByIdAction,
        bookId
      })

      reply.status(200).send(books)
    } catch {
      reply.status(500).send({ message: globalErrorMessage.unexpected })
    }
  })

  app.post(
    '/books',
    {
      preHandler: async (req, reply) => {
        const accessToken = req.headers.authorization
        await authorization(accessToken, reply)
      },
      schema: createBookSchema.schema
    },
    async (req, reply) => {
      try {
        const decoded = await verifyToken(req.headers.authorization)

        const { book } = req.body

        let heroPathUrl = book.heroPathUrl

        if (heroPathUrl) {
          const base64Data = heroPathUrl.replace(/^data:image\/[a-z]+;base64,/, '')
          const bookCover = await CreateBookCoverService({ base64Image: base64Data })
          heroPathUrl = bookCover
        }

        const newBook = await CreateBookService({
          actions: actionCreateBook,
          book: { ...book, heroPathUrl },
          authorId: decoded?.id
        })

        if (!newBook) {
          throw new Error('CreateBookService retornou undefined')
        }

        reply.status(201).send(newBook)
      } catch (e) {
        reply.status(500).send({ message: e.message || globalErrorMessage.unexpected })
      }
    }
  )

  app.delete(
    '/books/:bookId',
    {
      preHandler: async (req, reply) => {
        const accessToken = req.headers.authorization
        await authorization(accessToken, reply)
      },
      schema: deleteBookSchema.schema
    },
    async (req, reply) => {
      try {
        const decoded = await verifyToken(req.headers.authorization)

        const { bookId } = req.params

        await validateUserByBookId({
          action: {
            getBookById
          },
          bookId,
          decoded,
          reply
        })

        const deletedBook = await DeleteBookService({
          action: deleteBookAction,
          bookId
        })

        if (!deletedBook)
          return reply.status(404).send({ message: globalErrorMessage.unableToDelete })

        reply.status(202).send({
          message: globalErrorMessage.successfullyDeleted,
          deletedBook
        })
      } catch {
        reply.status(500).send({ message: globalErrorMessage.unexpected })
      }
    }
  )

  app.patch(
    '/books/:bookId',
    {
      preHandler: async (req, reply) => {
        const accessToken = req.headers.authorization
        await authorization(accessToken, reply)
      },
      schema: updateBoolsBookInfoSchema.schema
    },
    async (req, reply) => {
      try {
        const decoded = await verifyToken(req.headers.authorization)

        const { bookId } = req.params
        const { where } = req.body

        await validateUserByBookId({
          action: {
            getBookById
          },
          bookId,
          decoded,
          reply
        })

        if (where === 'isActive') {
          const patchedIsActiveBook = await PatchActiveBookService({
            action: patchActiveBookAction,
            bookId
          })

          return reply.status(200).send(patchedIsActiveBook)
        }

        if (where === 'conclued') {
          const patchedConcluedBook = await PatchConcluedBookService({
            action: patchConcluedBookAction,
            bookId
          })

          return reply.status(202).send(patchedConcluedBook)
        }
      } catch {
        reply.status(500).send({ message: globalErrorMessage.unexpected })
      }
    }
  )

  app.put(
    '/updateBook/:bookId',
    {
      preHandler: async (req, reply) => {
        const accessToken = req.headers.authorization
        await authorization(accessToken, reply)
      },
      schema: updateBookInfoSchema.schema
    },
    async (req, reply) => {
      try {
        const decoded = await verifyToken(req.headers.authorization)

        const { bookId } = req.params
        const { book } = req.body

        await validateUserByBookId({
          action: {
            getBookById
          },
          bookId,
          decoded,
          reply
        })

        const newBook = await UpdateBookService({
          action: updateBookAction,
          bookId,
          updatedBook: book
        })

        reply.status(200).send(newBook)
      } catch {
        reply.status(500).send({ message: globalErrorMessage.unexpected })
      }
    }
  )
}
