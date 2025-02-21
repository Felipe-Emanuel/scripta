import { TFastifyInstance, TUpdateChapter } from '@types'
import { globalErrorMessage } from '@utils'

import { authorization } from 'src/middlewares'

import { throwChapterMessages } from '@entities/Chapter/utils'
import { chapterByIdSchema } from '@entities/Chapter/chaptersSchema'

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
    getChapterById
  }

  const deleteActions: TDeleteChapterServiceRequest['actions'] = {
    deleteChapter,
    getChapterById
  }

  app.post(
    '/chapter/:userEmail',
    {
      preHandler: async (req, reply) => {
        const provider = req.headers.provider
        const accessToken = req.headers.authorization

        await authorization(provider, accessToken, reply)
      },
      schema: createChapterSchema.schema
    },
    async (req, apply) => {
      const { userEmail } = req.params
      const { chapter } = req.body

      const {
        id,
        bookId,
        isConclued,
        chapterTitle,
        chapterText,
        wordsCounter,
        firstLineIndent,
        lineHeight,
        fontSize,
        fontWeight,
        createdAt,
        updatedAt
      } = chapter

      const existentChapter = await GetChapterByIdService({
        action: getChapterAction,
        chapterId: chapter.id
      })

      if (existentChapter) {
        const updatedChapter: TUpdateChapter = {
          bookId,
          chapterText,
          firstLineIndent,
          fontSize,
          fontWeight,
          id,
          lineHeight
        }
        const updatedBook = await UpdateChapterService({
          actions: actionsUpdateChapter,
          updatedChapter,
          userEmail
        })

        apply.status(201).send(updatedBook)
      }

      const lastChapters = await getAllChapters(chapter.bookId)
      const lastChapter = lastChapters?.[0]

      if (lastChapters?.length > 0 && !lastChapter?.isConclued)
        return apply.status(200).send({ message: throwChapterMessages.lastChapterActive })

      const newChapter = await CreateChapterService({
        action: actionCreateChapter,
        chapter: {
          id,
          bookId,
          isConclued,
          chapterTitle,
          chapterText,
          wordsCounter,
          firstLineIndent,
          lineHeight,
          fontSize,
          fontWeight,
          createdAt: new Date(createdAt),
          updatedAt: new Date(updatedAt)
        }
      })

      try {
        apply.status(201).send(newChapter)
      } catch {
        apply.status(500).send({ message: globalErrorMessage.unexpected })
      }
    }
  )

  app.put(
    '/chapter/:userEmail',
    {
      preHandler: async (req, reply) => {
        const provider = req.headers.provider
        const accessToken = req.headers.authorization

        await authorization(provider, accessToken, reply)
      },
      schema: updateChapterSchema.schema
    },
    async (req, apply) => {
      const { userEmail } = req.params
      const { updatedChapter } = req.body

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
        apply.status(200).send(updatedBook)
      } catch {
        apply.status(500).send({ message: globalErrorMessage.unexpected })
      }
    }
  )

  app.get('/chapters/:bookId', getAllChaptersByBookIdSchema, async (req, apply) => {
    const { bookId } = req.params

    const allChapters = await GetAllChaptersByBookIdService({
      action: getAllChaptersAction,
      bookId
    })

    try {
      apply.status(200).send(allChapters)
    } catch {
      apply.status(500).send({ message: globalErrorMessage.unexpected })
    }
  })

  app.get('/chapter/:chapterId', getChapterByIdSchema, async (req, apply) => {
    const { chapterId } = req.params

    const chapter = await GetChapterByIdService({
      action: getChapterAction,
      chapterId
    })

    try {
      apply.status(200).send(chapter)
    } catch {
      apply.status(500).send({ message: globalErrorMessage.unexpected })
    }
  })

  app.patch(
    '/chapterConlued/:chapterId',
    {
      preHandler: async (req, reply) => {
        const provider = req.headers.provider
        const accessToken = req.headers.authorization

        await authorization(provider, accessToken, reply)
      },
      schema: chapterConluedSchema.schema
    },
    async (req, apply) => {
      const { chapterId } = chapterByIdSchema.parse(req.params)

      const patchedChapter = await PatchConcluedChapterService({
        actions: patchConcluedChapterAction,
        chapterIdToBeEdited: chapterId
      })

      try {
        apply.status(200).send(patchedChapter)
      } catch {
        apply.status(500).send({ message: globalErrorMessage.unexpected })
      }
    }
  )

  app.patch(
    '/chapter/:chapterId',
    {
      preHandler: async (req, reply) => {
        const provider = req.headers.provider
        const accessToken = req.headers.authorization

        await authorization(provider, accessToken, reply)
      },
      schema: patchTitleSchema.schema
    },
    async (req, apply) => {
      const { chapterId } = req.params
      const { title } = req.body

      const patchedChapter = await PatchChapterTitleService({
        actions: patchTitleAction,
        chapterId,
        newTitle: title
      })

      try {
        apply.status(200).send(patchedChapter)
      } catch {
        apply.status(500).send({ message: globalErrorMessage.unexpected })
      }
    }
  )

  app.delete(
    '/deleteChapter/:chapterId',
    {
      preHandler: async (req, reply) => {
        const provider = req.headers.provider
        const accessToken = req.headers.authorization

        await authorization(provider, accessToken, reply)
      },
      schema: deleteChapterSchema.schema
    },
    async (req, apply) => {
      const { chapterId } = req.params

      const response = await DeleteChapterService({
        actions: deleteActions,
        paramChapterId: chapterId
      })

      try {
        apply.status(202).send(response)
      } catch {
        apply.status(500).send({ message: globalErrorMessage.unexpected })
      }
    }
  )
}
