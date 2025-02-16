import { inMemoryBooksRepository, inMemoryChapterRepository } from '~/src/repositories'
import { DeleteChapterService, TDeleteChapterServiceRequest } from '.'
import { jestErrorHandler } from '~/__tests__/jestErrorHandler'
import { throwChapterMessages } from '~/src/entities/Chapter/utils'
import { bookEntitieMock } from '~/src/entities/Book/mocks'
import { CreateBookService, TCreateBookServiceRequest } from '../../bookServices'
import { CreateChapterService, TCreateChapterServiceRequest } from '../create'
import { chapterMock } from '~/src/entities/Chapter/mocks'

describe('DeleteChapterService', () => {
  const { deleteChapter, getChapterById, createChapter } = inMemoryChapterRepository()
  const { createBook, getAllBooks } = inMemoryBooksRepository()

  const actions: TDeleteChapterServiceRequest['actions'] = {
    deleteChapter,
    getChapterById
  }

  const createBookActions: TCreateBookServiceRequest['actions'] = {
    createBook,
    getAllBooks
  }

  const createChapterAction: TCreateChapterServiceRequest['action'] = {
    createChapter
  }

  it('should throw about id be required', async () => {
    try {
      await DeleteChapterService({
        actions,
        paramChapterId: undefined
      })
    } catch (e) {
      jestErrorHandler({
        error: e,
        expected: throwChapterMessages.idRequired
      })
    }
  })

  it('should throw about not found', async () => {
    try {
      await DeleteChapterService({
        actions,
        paramChapterId: 'null'
      })
    } catch (e) {
      jestErrorHandler({
        error: e,
        expected: throwChapterMessages.notFound
      })
    }
  })

  it('should delete a existent chapter and returns /Capítulo deletado com sucesso!/', async () => {
    CreateBookService({
      actions: createBookActions,
      book: bookEntitieMock,
      userEmail: bookEntitieMock.userEmail
    })

    const existentChapter = await CreateChapterService({
      action: createChapterAction,
      chapter: chapterMock
    })

    const sut = await DeleteChapterService({
      actions,
      paramChapterId: existentChapter.id
    })

    expect(sut).toBe('Capítulo deletado com sucesso!')
  })
})
