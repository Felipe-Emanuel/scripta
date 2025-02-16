import { jestErrorHandler } from '~/__tests__/jestErrorHandler'
import { throwGoalsMessages } from '@entities/Goals/utils'
import { inMemoryChapterRepository } from '@repositories'
import { GetAllChaptersByUserEmailService, TGetAllChaptersByUserEmailRequest } from '.'
import { CreateChapterService, TCreateChapterServiceRequest } from '../create'
import { chapterMock } from '~/src/entities/Chapter/mocks'
import { randomUUID } from 'crypto'
import { bookEntitieMock } from '~/src/entities/Book/mocks'

describe('GetAllChaptersByUserEmailService', () => {
  const { getAllUpdatedChapters } = inMemoryChapterRepository()
  const { createChapter } = inMemoryChapterRepository()

  const action: TGetAllChaptersByUserEmailRequest['action'] = {
    getAllUpdatedChapters
  }

  const createChapterAction: TCreateChapterServiceRequest['action'] = {
    createChapter
  }

  it('should throw about userEmail', async () => {
    try {
      await GetAllChaptersByUserEmailService({
        action,
        paramUserEmail: ''
      })
    } catch (e) {
      jestErrorHandler({
        error: e,
        expected: throwGoalsMessages.missingEmail
      })
    }
  })

  it('should return all chapters with date of today', async () => {
    const today = new Date()
    const yesterday = new Date()
    yesterday.setDate(today.getDate() - 1)

    const chapterMockYesterday = {
      ...chapterMock,
      id: randomUUID(),
      updatedAt: yesterday
    }

    const chapterMockToday = {
      ...chapterMock,
      id: randomUUID(),
      updatedAt: today
    }

    const createYesterday = await CreateChapterService({
      action: createChapterAction,
      chapter: chapterMockYesterday
    })

    const createToday = await CreateChapterService({
      action: createChapterAction,
      chapter: chapterMockToday
    })

    await Promise.all([createYesterday, createToday])

    const sut = await GetAllChaptersByUserEmailService({
      action,
      paramUserEmail: bookEntitieMock.userEmail
    })

    expect(sut).toHaveLength(1)
  })
})
