import { UpdateChapterService, TUpdateChapterServiceRequest } from '.'
import { CreateChapterService, TCreateChapterServiceRequest } from '../create'
import { jestErrorHandler } from '~/__tests__/jestErrorHandler'
import { chapterMock } from '@entities/Chapter/mocks'
import { bookEntitieMock } from '@entities/Book/mocks'
import { throwChapterMessages } from '@entities/Chapter/utils'
import { CreateBookService, TCreateBookServiceRequest } from '@services'
import { inMemoryBooksRepository, inMemoryChapterRepository } from '@repositories'
import { Chapter } from '@prisma/client'

describe('UpdateChapterService', () => {
  const { createChapter, getChapterById, updateChapter } = inMemoryChapterRepository()
  const { createBook, getAllBooks } = inMemoryBooksRepository()

  const actions: TUpdateChapterServiceRequest['actions'] = {
    getAllBooks,
    updateChapter,
    getChapterById
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
      userEmail: bookEntitieMock.userEmail
    })

    expect(sut).rejects.toThrow(throwChapterMessages.wrongId)
  })

  it('should throw about required email', async () => {
    try {
      const inexistentUserEmail = 'unexpexted email'

      await UpdateChapterService({
        actions,
        updatedChapter: { ...chapterMock },
        userEmail: inexistentUserEmail
      })
    } catch (e) {
      jestErrorHandler({
        error: e,
        expected: throwChapterMessages.invalidEmail
      })
    }
  })

  it('should update a existent Chapter', async () => {
    const existentBook = await CreateBookService({
      actions: createBookActions,
      book: bookEntitieMock,
      userEmail: bookEntitieMock.userEmail
    })

    const existentChapter = await CreateChapterService({
      action: createChapterAction,
      chapter: chapterMock
    })

    const chapterTitle = 'updated now'

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
      userEmail: bookEntitieMock.userEmail
    })

    expect(sut.chapterTitle).toEqual(chapterTitle)
  })
})
