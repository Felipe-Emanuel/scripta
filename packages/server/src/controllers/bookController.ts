import { globalErrorMessage } from '@utils'
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
  IPatchConcluedBookServiceRequest
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
    updateBook
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

  app.get(
    '/allBooks/:userEmail/:onlyFirstChapter',
    {
      preHandler: async (req, reply) => {
        const provider = req.headers.provider
        const accessToken = req.headers.authorization
        await authorization(provider, accessToken, reply)
      },
      schema: getAllBooksSchema.schema
    },
    async (req, apply) => {
      const { userEmail, onlyFirstChapter } = req.params

      const isFirstChapterOnly = onlyFirstChapter === 'true'

      const books = await GetAllBooksService({
        action: actionGetAllBooks,
        userEmail,
        onlyFirstChapter: isFirstChapterOnly
      })

      const booksWithDateStrings = books.map((book) => ({
        ...book,
        createdAt: book.createdAt.toISOString(),
        updatedAt: book.updatedAt.toISOString(),
        ...(book.chapters && {
          chapters: book.chapters.map((chapter) => ({
            ...chapter,
            createdAt: chapter.createdAt.toISOString(),
            updatedAt: chapter.updatedAt.toISOString()
          }))
        })
      }))

      try {
        apply.send(booksWithDateStrings)
      } catch (err) {
        console.error('Error in response:', err)
        apply.status(500).send({ message: globalErrorMessage.unexpected })
      }
    }
  )

  app.get('/books/:userEmail/:bookId', getBookByIdSchema, async (req, apply) => {
    const { userEmail, bookId } = req.params

    const books = await GetBookByIdService({
      action: actionGetAllBooks,
      paramUserEmail: userEmail,
      paramBookId: bookId
    })
    try {
      apply.status(200).send(books)
    } catch {
      apply.status(500).send({ message: globalErrorMessage.unexpected })
    }
  })

  app.post(
    '/books/:userEmail',
    {
      preHandler: async (req, reply) => {
        const provider = req.headers.provider
        const accessToken = req.headers.authorization
        await authorization(provider, accessToken, reply)
      },
      schema: createBookSchema.schema
    },
    async (req, apply) => {
      const { userEmail } = req.params
      const { book } = req.body

      let newBook = book

      if (book.heroPathUrl) {
        const base64Data = book.heroPathUrl.replace(/^data:image\/[a-z]+;base64,/, '')
        const bookCover = await CreateBookCoverService({
          base64Image: base64Data
        })

        newBook.heroPathUrl = bookCover
      }

      newBook = await CreateBookService({
        actions: actionCreateBook,
        book,
        userEmail
      })

      try {
        apply.send(newBook)
      } catch {
        apply.status(500).send({ message: globalErrorMessage.unexpected })
      }
    }
  )

  app.delete(
    '/books/:bookId',
    {
      preHandler: async (req, reply) => {
        const provider = req.headers.provider
        const accessToken = req.headers.authorization
        await authorization(provider, accessToken, reply)
      },
      schema: deleteBookSchema.schema
    },
    async (req, apply) => {
      const { bookId } = req.params as Partial<TDeleteBookServiceRequest>

      const deletedBook = await DeleteBookService({
        action: deleteBookAction,
        bookId
      })

      if (!deletedBook) apply.status(404).send({ message: globalErrorMessage.unableToDelete })

      try {
        apply.status(202).send({
          message: globalErrorMessage.successfullyDeleted,
          deletedBook
        })
      } catch {
        apply.status(500).send({ message: globalErrorMessage.unexpected })
      }
    }
  )

  app.put(
    '/books/:bookId',
    {
      preHandler: async (req, reply) => {
        const provider = req.headers.provider
        const accessToken = req.headers.authorization
        await authorization(provider, accessToken, reply)
      },
      schema: updateBoolsBookInfoSchema.schema
    },
    async (req, apply) => {
      const { bookId } = req.params
      const { where } = req.body

      try {
        if (where === 'isActive') {
          const patchedIsActiveBook = await PatchActiveBookService({
            action: patchActiveBookAction,
            bookId
          })

          return apply.status(200).send(patchedIsActiveBook)
        }

        if (where === 'conclued') {
          const patchedConcluedBook = await PatchConcluedBookService({
            action: patchConcluedBookAction,
            bookId
          })

          return apply.status(200).send(patchedConcluedBook)
        }
      } catch {
        apply.status(500).send({ message: globalErrorMessage.unexpected })
      }
    }
  )

  app.put(
    '/updateBook/:bookId',
    {
      preHandler: async (req, reply) => {
        const provider = req.headers.provider
        const accessToken = req.headers.authorization
        await authorization(provider, accessToken, reply)
      },
      schema: updateBookInfoSchema.schema
    },
    async (req, apply) => {
      const { bookId } = req.params
      const { book } = req.body

      const {
        Gender,
        Theme,
        conclued,
        createdAt,
        description,
        heroPathUrl,
        hits,
        id,
        isActive,
        socialLink,
        title,
        totalWords,
        updatedAt,
        userEmail
      } = book

      const newBook = await UpdateBookService({
        action: updateBookAction,
        bookId,
        book: {
          Gender,
          Theme,
          conclued,
          createdAt: new Date(createdAt),
          description,
          heroPathUrl,
          hits,
          id,
          isActive,
          socialLink,
          title,
          totalWords,
          updatedAt: new Date(updatedAt),
          userEmail
        }
      })

      try {
        apply.status(200).send(newBook)
      } catch {
        apply.status(500).send({ message: globalErrorMessage.unexpected })
        console.log(new Date())
      }
    }
  )
}
