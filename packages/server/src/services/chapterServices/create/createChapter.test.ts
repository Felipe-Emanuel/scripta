import { CreateChapterService, TCreateChapterServiceRequest } from '.'
import { inMemoryChapterRepository } from '@repositories'
import { Chapter } from '@prisma/client'
import { chapterMock } from '~/src/shared/mocks'

describe('CreateChapterService', () => {
  const { createChapter } = inMemoryChapterRepository()

  const action: TCreateChapterServiceRequest['action'] = {
    createChapter
  }

  it('should create a new Chapter', async () => {
    const newChapter: Chapter = {
      ...chapterMock
    }

    const sut = await CreateChapterService({
      action,
      chapter: newChapter
    })

    expect(sut.bookId).toEqual(newChapter.bookId)
  })
})
