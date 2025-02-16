import { inMemoryChapterRepository } from '~/src/repositories'
import { GetAllChaptersByBookIdService, TGetAllChaptersByBookIdServiceRequest } from '.'
import { CreateChapterService, TCreateChapterServiceRequest } from '../create'
import { chapterMock } from '~/src/entities/Chapter/mocks'

describe('GetAllChaptersByBookIdService', () => {
  const { getAllChapters, createChapter } = inMemoryChapterRepository()

  const getAllChaptersAction: TGetAllChaptersByBookIdServiceRequest['action'] = {
    getAllChapters
  }

  const actionCreateChapter: TCreateChapterServiceRequest['action'] = {
    createChapter
  }

  const bookId = chapterMock.bookId

  it('should return a empty array of chapters', async () => {
    const sut = await GetAllChaptersByBookIdService({
      action: getAllChaptersAction,
      bookId
    })

    expect(sut).toStrictEqual([])
  })

  it('should create and return a non empty array of chapters', async () => {
    const newChapter = await CreateChapterService({
      action: actionCreateChapter,
      chapter: chapterMock
    })

    const sut = await GetAllChaptersByBookIdService({
      action: getAllChaptersAction,
      bookId
    })

    expect(sut).toStrictEqual([{ ...newChapter }])
  })
})
