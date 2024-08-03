import { inMemoryChapterRepository } from '~/src/repositories'
import { CreateChapterService, TCreateChapterServiceRequest } from '.'
import { chapterMock } from '~/src/entities/Chapter/mocks'
import { Chapter } from '@prisma/client'

describe('CreateChapterService', () => {
  const { createChapter } = inMemoryChapterRepository()

  const action: TCreateChapterServiceRequest['action'] = {
    createChapter
  }

  it('should create a new Chapter', async () => {
    const chapterTitle = 'created now'

    const newChapter: Chapter = {
      ...chapterMock,
      chapterTitle
    }

    const sut = await CreateChapterService({
      action,
      chapter: newChapter
    })

    expect(sut.chapterTitle).toEqual(chapterTitle)
  })
})
