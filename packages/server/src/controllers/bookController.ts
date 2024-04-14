import { globalErrorMessage } from '@utils'
import { FastifyInstance } from 'fastify'
import { authorization } from 'src/controllers/utils'
import { databaseBookRepository } from '@repositories'
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
  TUpdateBookServiceRequest
} from '@services'
import {
  IPatchConcluedBookServiceRequest,
  PatchConcluedBookService
} from 'src/services/bookServices/patchConclued'

type TPatchBookState = {
  where: 'conclued' | 'isActive'
  bookId: string
}

export async function bookController(app: FastifyInstance): Promise<void> {
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

  app.get('/books/:userEmail', async (req, apply) => {
    const { userEmail } = req.params as Partial<TGetAllBooksServiceRequest>
    const provider = req.headers.provider
    const accessToken = req.headers.authorization

    await authorization(provider, accessToken, apply)

    const books = await GetAllBooksService({
      action: actionGetAllBooks,
      userEmail
    })

    try {
      apply.send(books)
    } catch {
      apply.status(500).send({ message: globalErrorMessage.unexpected })
    }
  })

  app.post('/books/:userEmail', async (req, apply) => {
    const { userEmail } = req.params as Partial<TCreateBookServiceRequest>
    const { book } = req.body as Partial<TCreateBookServiceRequest>
    const provider = req.headers.provider
    const accessToken = req.headers.authorization

    await authorization(provider, accessToken, apply)

    const newBook = await CreateBookService({
      actions: actionCreateBook,
      book,
      userEmail
    })

    try {
      apply.send(newBook)
    } catch {
      apply.status(500).send({ message: globalErrorMessage.unexpected })
    }
  })

  app.delete('/books/:bookId', async (req, apply) => {
    const { bookId } = req.params as Partial<TDeleteBookServiceRequest>
    const provider = req.headers.provider
    const accessToken = req.headers.authorization

    await authorization(provider, accessToken, apply)

    const deletedBook = await DeleteBookService({
      action: deleteBookAction,
      bookId
    })

    if (!deletedBook) apply.status(404).send({ message: globalErrorMessage.unableToDelete })

    try {
      apply.send({
        message: globalErrorMessage.successfullyDeleted,
        deletedBook
      })
    } catch {
      apply.status(500).send({ message: globalErrorMessage.unexpected })
    }
  })

  app.put('/books/:bookId', async (req, apply) => {
    const { bookId } = req.params as Partial<TPatchBookState>
    const { where } = req.body as Partial<TPatchBookState>
    const provider = req.headers.provider
    const accessToken = req.headers.authorization

    await authorization(provider, accessToken, apply)

    try {
      if (where === 'isActive') {
        const patchedIsActiveBook = await PatchActiveBookService({
          action: patchActiveBookAction,
          bookId
        })

        return apply.send(patchedIsActiveBook)
      }

      if (where === 'conclued') {
        const patchedConcluedBook = await PatchConcluedBookService({
          action: patchConcluedBookAction,
          bookId
        })

        return apply.send(patchedConcluedBook)
      }
    } catch {
      apply.status(500).send({ message: globalErrorMessage.unexpected })
    }
  })

  app.put('/updateBook/:bookId', async (req, apply) => {
    const { bookId } = req.params as Partial<TUpdateBookServiceRequest>
    const { book } = req.body as Partial<TUpdateBookServiceRequest>
    const provider = req.headers.provider
    const accessToken = req.headers.authorization

    await authorization(provider, accessToken, apply)

    const newBook = await UpdateBookService({
      action: updateBookAction,
      bookId,
      book
    })

    try {
      apply.send(newBook)
    } catch {
      apply.status(500).send({ message: globalErrorMessage.unexpected })
    }
  })
}
