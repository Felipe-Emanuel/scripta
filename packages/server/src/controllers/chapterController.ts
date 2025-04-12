import { TFastifyInstance } from '@types'
import { globalErrorMessage, throwChapterMessages, validateUserByBookId, verifyToken } from '@utils'

import { authorization } from 'src/middlewares'

import {
  databaseBookRepository,
  databaseChapterRepository,
  databaseGoalsRepository
} from '@repositories'

import {
  CreateChapterService,
  GetAllChaptersByBookIdService,
  GetChapterByIdService,
  TCreateChapterServiceRequest,
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
  createChapterSchema,
  updateChapterSchema,
  getAllChaptersByBookIdSchema,
  getChapterByIdSchema,
  chapterConluedSchema,
  patchTitleSchema,
  deleteChapterSchema
} from '@schemas'

export async function chapterController(app: TFastifyInstance): Promise<void> {
  const {
    createChapter,
    getChapterById,
    updateChapter,
    getAllChapters,
    deleteChapter,
    patchChapterTitle
  } = databaseChapterRepository()
  const { getAllBooks, getBookById } = databaseBookRepository()
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
    patchChapterTitle
  }

  const deleteActions: TDeleteChapterServiceRequest['actions'] = {
    deleteChapter,
    getChapterById
  }

  app.post(
    '/chapter',
    {
      preHandler: async (req, reply) => {
        const accessToken = req.headers.authorization

        await authorization(accessToken, reply)
      },
      schema: createChapterSchema.schema
    },
    async (req, reply) => {
      try {
        const decoded = await verifyToken(req.headers.authorization)

        const { chapter } = req.body

        await validateUserByBookId({
          action: {
            getBookById
          },
          bookId: chapter.bookId,
          decoded,
          reply
        })

        const lastChapters = await getAllChapters(chapter.bookId)
        const lastChapter = lastChapters?.[0]

        if (lastChapters?.length > 0 && !lastChapter?.isConclued)
          return reply.status(200).send({ message: throwChapterMessages.lastChapterActive })

        const newChapter = await CreateChapterService({
          action: actionCreateChapter,
          chapter
        })

        reply.status(201).send(newChapter)
      } catch {
        reply.status(500).send({ message: globalErrorMessage.unexpected })
      }
    }
  )

  app.put(
    '/chapter',
    {
      preHandler: async (req, reply) => {
        const accessToken = req.headers.authorization

        await authorization(accessToken, reply)
      },
      schema: updateChapterSchema.schema
    },
    async (req, reply) => {
      try {
        const decoded = await verifyToken(req.headers.authorization)

        const { updatedChapter } = req.body
        await validateUserByBookId({
          action: {
            getBookById
          },
          bookId: updatedChapter.bookId,
          decoded,
          reply
        })

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
          userid: decoded?.id,
          newWords
        })

        reply.status(200).send(updatedBook)
      } catch {
        reply.status(500).send({ message: globalErrorMessage.unexpected })
      }
    }
  )

  app.get('/chapters/:bookId', getAllChaptersByBookIdSchema, async (req, reply) => {
    try {
      const { bookId } = req.params

      const allChapters = await GetAllChaptersByBookIdService({
        action: getAllChaptersAction,
        bookId
      })

      reply.status(200).send(allChapters)
    } catch {
      reply.status(500).send({ message: globalErrorMessage.unexpected })
    }
  })

  app.get('/chapter/:chapterId', getChapterByIdSchema, async (req, reply) => {
    try {
      const { chapterId } = req.params

      const chapter = await GetChapterByIdService({
        action: getChapterAction,
        chapterId
      })

      reply.status(200).send(chapter)
    } catch {
      reply.status(500).send({ message: globalErrorMessage.unexpected })
    }
  })

  app.patch(
    '/chapterConlued/:chapterId',
    {
      preHandler: async (req, reply) => {
        const accessToken = req.headers.authorization

        await authorization(accessToken, reply)
      },
      schema: chapterConluedSchema.schema
    },
    async (req, reply) => {
      try {
        const { chapterId } = req.params

        const patchedChapter = await PatchConcluedChapterService({
          actions: patchConcluedChapterAction,
          chapterIdToBeEdited: chapterId
        })

        reply.status(200).send(patchedChapter)
      } catch {
        reply.status(500).send({ message: globalErrorMessage.unexpected })
      }
    }
  )

  app.patch(
    '/chapter/:chapterId',
    {
      preHandler: async (req, reply) => {
        const accessToken = req.headers.authorization

        await authorization(accessToken, reply)
      },
      schema: patchTitleSchema.schema
    },
    async (req, reply) => {
      try {
        const { chapterId } = req.params
        const { title } = req.body

        const patchedChapter = await PatchChapterTitleService({
          actions: patchTitleAction,
          chapterId,
          body: {
            title
          }
        })

        reply.status(200).send(patchedChapter)
      } catch {
        reply.status(500).send({ message: globalErrorMessage.unexpected })
      }
    }
  )

  app.delete(
    '/deleteChapter/:chapterId',
    {
      preHandler: async (req, reply) => {
        const accessToken = req.headers.authorization

        await authorization(accessToken, reply)
      },
      schema: deleteChapterSchema.schema
    },
    async (req, reply) => {
      try {
        const { chapterId } = req.params

        const response = await DeleteChapterService({
          actions: deleteActions,
          paramChapterId: chapterId
        })

        reply.status(202).send(response)
      } catch {
        reply.status(500).send({ message: globalErrorMessage.unexpected })
      }
    }
  )
}
