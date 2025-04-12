import { UpdateChapterService, TUpdateChapterServiceRequest } from '.'
import { CreateChapterService, TCreateChapterServiceRequest } from '../create'
import { CreateBookService, TCreateBookServiceRequest } from '@services'
import {
  inMemoryBooksRepository,
  inMemoryChapterRepository,
  inMemoryGoalsRepository
} from '@repositories'
import { Chapter } from '@prisma/client'
import { bookEntitieMock, chapterMock } from '~/src/shared/mocks'
import { throwChapterMessages } from '@utils'

describe('UpdateChapterService', () => {
  const { createChapter, getChapterById, updateChapter } = inMemoryChapterRepository()
  const { createBook, getAllBooks } = inMemoryBooksRepository()
  const { updateGoal } = inMemoryGoalsRepository()

  const actions: TUpdateChapterServiceRequest['actions'] = {
    getAllBooks,
    updateChapter,
    getChapterById,
    updateGoal
  }

  const createBookActions: TCreateBookServiceRequest['actions'] = {
    createBook,
    getAllBooks
  }

  const createChapterAction: TCreateChapterServiceRequest['action'] = {
    createChapter
  }

  it('should throw about wrongId', async () => {
    const inexistentBookId = 'unexpexted id'

    const updateChapter: Chapter = {
      ...chapterMock,
      bookId: inexistentBookId
    }

    const sut = UpdateChapterService({
      actions,
      updatedChapter: updateChapter,
      userid: bookEntitieMock.userId
    })

    expect(sut).rejects.toThrow(throwChapterMessages.wrongId)
  })

  it('should update a existent Chapter', async () => {
    const existentBook = await CreateBookService({
      actions: createBookActions,
      book: bookEntitieMock,
      authorId: bookEntitieMock.userId
    })

    const existentChapter = await CreateChapterService({
      action: createChapterAction,
      chapter: chapterMock
    })

    const chapterTitle = 'Novo capítulo'

    const updateChapter: Chapter = {
      ...chapterMock,
      bookId: existentBook.id,
      chapterTitle
    }

    const updatedChapter = {
      id: existentChapter.id,
      ...updateChapter
    }

    const sut = await UpdateChapterService({
      actions,
      updatedChapter: updatedChapter,
      userid: bookEntitieMock.userId
    })

    expect(sut.chapterTitle).toEqual(chapterTitle)
  })
})
