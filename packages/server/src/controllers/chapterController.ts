import { z } from 'zod'
import { FastifyInstance } from 'fastify'
import {
  CreateChapterService,
  GetAllBooksService,
  GetChapterByIdService,
  TCreateChapterServiceRequest,
  TGetAllBooksServiceRequest,
  TGetChapterByIdServiceRequest,
  TUpdateChapterServiceRequest,
  UpdateChapterService
} from '@services'
import { databaseBookRepository, databaseChapterRepository } from '@repositories'
import { throwChapterMessages } from '@entities/Chapter/utils'
import { globalErrorMessage } from '@utils'
import { authorization } from 'src/middlewares'

export async function chapterController(app: FastifyInstance): Promise<void> {
  const { createChapter, getChapterById, updateChapter } = databaseChapterRepository()
  const { getAllBooks } = databaseBookRepository()

  const actionCreateChapter: TCreateChapterServiceRequest['action'] = {
    createChapter
  }
  const actionGetAllBooks: TGetAllBooksServiceRequest['action'] = {
    getAllBooks
  }

  const actionsUpdateChapter: TUpdateChapterServiceRequest['actions'] = {
    getAllBooks,
    updateChapter,
    getChapterById
  }

  const getChapterAction: TGetChapterByIdServiceRequest['action'] = {
    getChapterById
  }

  app.post('/chapter/:userEmail', async (req, apply) => {
    const { userEmail } = req.params as Partial<TGetAllBooksServiceRequest>
    const { chapter } = req.body as Partial<TCreateChapterServiceRequest>

    const provider = req.headers.provider
    const accessToken = req.headers.authorization

    await authorization(provider, accessToken, apply)

    const paramSchema = z.object({
      userEmail: z
        .string({
          required_error: throwChapterMessages.requiredEmail
        })
        .email('e-mail inválido!')
    })

    const email = paramSchema.parse({ userEmail })

    const existentChapter = await GetChapterByIdService({
      action: getChapterAction,
      chapterId: chapter.id
    })

    if (existentChapter) {
      const updatedBook = await UpdateChapterService({
        actions: actionsUpdateChapter,
        updatedChapter: chapter,
        userEmail
      })

      apply.send(updatedBook)
    }

    const booksByEmail = await GetAllBooksService({
      action: actionGetAllBooks,
      userEmail: email.userEmail
    })

    const existentBook = booksByEmail.find((book) => book.id === chapter.bookId)

    if (!existentBook.id) throw new Error(throwChapterMessages.wrongId)

    const newChapter = await CreateChapterService({
      action: actionCreateChapter,
      chapter
    })

    try {
      apply.send(newChapter)
    } catch {
      apply.status(500).send({ message: globalErrorMessage.unexpected })
    }
  })

  app.put('/chapter/:userEmail', async (req, apply) => {
    const { userEmail } = req.params as Partial<TGetAllBooksServiceRequest>
    const { chapter } = req.body as Partial<TCreateChapterServiceRequest>

    const provider = req.headers.provider
    const accessToken = req.headers.authorization

    await authorization(provider, accessToken, apply)

    const updatedBook = await UpdateChapterService({
      actions: actionsUpdateChapter,
      updatedChapter: chapter,
      userEmail
    })

    try {
      apply.send(updatedBook)
    } catch {
      apply.status(500).send({ message: globalErrorMessage.unexpected })
    }
  })
}
