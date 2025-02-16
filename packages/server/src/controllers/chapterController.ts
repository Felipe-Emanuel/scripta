import { FastifyInstance } from 'fastify'
import {
  databaseBookRepository,
  databaseChapterRepository,
  databaseGoalsRepository
} from '@repositories'
import { globalErrorMessage } from '@utils'
import { authorization } from 'src/middlewares'
import {
  chapterByIdSchema,
  chaptersSchema,
  chapterTitleSchema
} from '../entities/Chapter/chaptersSchema'

import {
  CreateChapterService,
  GetAllChaptersByBookIdService,
  GetChapterByIdService,
  TCreateChapterServiceRequest,
  TGetAllBooksServiceRequest,
  TGetAllChaptersByBookIdServiceRequest,
  TGetChapterByIdServiceRequest,
  TUpdateChapterServiceRequest,
  UpdateChapterService,
  PatchChapterTitleService,
  TPatchChapterTitleServiceRequest,
  PatchConcluedChapterService,
  TPatchConcluedChapterServiceRequest,
  TDeleteChapterServiceRequest,
  DeleteChapterService
} from '@services'
import {
  updateChapterControllerSchema,
  updateChapterServiceSchema,
  deleteChapterSchema
} from '@schemas'

export async function chapterController(app: FastifyInstance): Promise<void> {
  const { createChapter, getChapterById, updateChapter, getAllChapters, deleteChapter } =
    databaseChapterRepository()
  const { getAllBooks } = databaseBookRepository()
  const { updateGoal } = databaseGoalsRepository()

  const actionCreateChapter: TCreateChapterServiceRequest['action'] = {
    createChapter
  }

  const actionsUpdateChapter: TUpdateChapterServiceRequest['actions'] = {
    getAllBooks,
    updateChapter,
    getChapterById,
    updateGoal
  }

  const getChapterAction: TGetChapterByIdServiceRequest['action'] = {
    getChapterById
  }

  const getAllChaptersAction: TGetAllChaptersByBookIdServiceRequest['action'] = {
    getAllChapters
  }

  const patchConcluedChapterAction: TPatchConcluedChapterServiceRequest['actions'] = {
    getChapterById,
    updateChapter
  }

  const patchTitleAction: TPatchChapterTitleServiceRequest['actions'] = {
    getChapterById,
    updateChapter
  }

  const deleteActions: TDeleteChapterServiceRequest['actions'] = {
    deleteChapter,
    getChapterById
  }

  app.post('/chapter/:userEmail', async (req, apply) => {
    const { userEmail } = req.params as Partial<TGetAllBooksServiceRequest>
    const { chapter } = req.body as Partial<TCreateChapterServiceRequest>

    const provider = req.headers.provider
    const accessToken = req.headers.authorization

    await authorization(provider, accessToken, apply)

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

    const lastChapters = await getAllChapters(chapter.bookId)
    const lastChapter = lastChapters?.[0]

    if (lastChapters?.length > 0 && !lastChapter?.isConclued)
      return apply.status(200).send({ message: 'O ultimo capítulo não está concluído' })

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
    const { userEmail } = updateChapterServiceSchema.parse(req.params)
    const { updatedChapter } = updateChapterControllerSchema.parse(req.body)

    const provider = req.headers.provider
    const accessToken = req.headers.authorization

    await authorization(provider, accessToken, apply)

    const countWords = (text: string) => text.trim().split(/\s+/).length

    const previousChapter = await actionsUpdateChapter.getChapterById(updatedChapter.id)
    const previousWordCount = previousChapter ? countWords(previousChapter.chapterText) : 0
    const newWordCount = countWords(updatedChapter.chapterText)

    const newWords = Math.max(newWordCount - previousWordCount, 0)

    const updatedBook = await UpdateChapterService({
      actions: actionsUpdateChapter,
      updatedChapter: {
        id: updatedChapter.id,
        chapterText: updatedChapter.chapterText,
        lineHeight: updatedChapter.lineHeight,
        fontWeight: updatedChapter.fontWeight,
        fontSize: updatedChapter.fontSize,
        firstLineIndent: updatedChapter.firstLineIndent,
        bookId: updatedChapter.bookId
      },
      userEmail,
      newWords
    })

    try {
      apply.send(updatedBook)
    } catch {
      apply.status(500).send({ message: globalErrorMessage.unexpected })
    }
  })

  app.get('/chapters/:bookId', async (req, apply) => {
    const { bookId } = chaptersSchema.parse(req.params)

    const allChapters = await GetAllChaptersByBookIdService({
      action: getAllChaptersAction,
      bookId
    })

    try {
      apply.send(allChapters)
    } catch {
      apply.status(500).send({ message: globalErrorMessage.unexpected })
    }
  })

  app.get('/chapter/:chapterId', async (req, apply) => {
    const { chapterId } = chapterByIdSchema.parse(req.params)

    const chapter = await GetChapterByIdService({
      action: getChapterAction,
      chapterId
    })

    try {
      apply.send(chapter)
    } catch {
      apply.status(500).send({ message: globalErrorMessage.unexpected })
    }
  })

  app.patch('/chapterConlued/:chapterId', async (req, apply) => {
    const { chapterId } = chapterByIdSchema.parse(req.params)

    const provider = req.headers.provider
    const accessToken = req.headers.authorization

    await authorization(provider, accessToken, apply)

    const patchedChapter = await PatchConcluedChapterService({
      actions: patchConcluedChapterAction,
      chapterIdToBeEdited: chapterId
    })

    try {
      apply.send(patchedChapter)
    } catch {
      apply.status(500).send({ message: globalErrorMessage.unexpected })
    }
  })

  app.patch('/chapter/:chapterId', async (req, apply) => {
    const { chapterId } = chapterByIdSchema.parse(req.params)
    const { title } = chapterTitleSchema.parse(req.body)

    const provider = req.headers.provider
    const accessToken = req.headers.authorization

    await authorization(provider, accessToken, apply)

    const patchedChapter = await PatchChapterTitleService({
      actions: patchTitleAction,
      chapterId,
      newTitle: title
    })

    try {
      apply.send(patchedChapter)
    } catch {
      apply.status(500).send({ message: globalErrorMessage.unexpected })
    }
  })

  app.delete('/deleteChapter/:chapterId', async (req, apply) => {
    const { chapterId } = deleteChapterSchema.parse(req.params)

    const provider = req.headers.provider
    const accessToken = req.headers.authorization

    await authorization(provider, accessToken, apply)

    const response = await DeleteChapterService({
      actions: deleteActions,
      paramChapterId: chapterId
    })

    try {
      apply.send(response)
    } catch {
      apply.status(500).send({ message: globalErrorMessage.unexpected })
    }
  })
}
