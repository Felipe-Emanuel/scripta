import { GetChapterByIdService, TGetChapterByIdServiceRequest } from '.'
import { CreateChapterService, TCreateChapterServiceRequest } from '../create'
import { inMemoryChapterRepository } from '@repositories'
import { throwChapterMessages } from '@entities/Chapter/utils'
import { chapterMock } from '@entities/Chapter/mocks'

describe('GetChapterByIdService', () => {
  const { getChapterById, createChapter } = inMemoryChapterRepository()

  const getChapterAction: TGetChapterByIdServiceRequest['action'] = {
    getChapterById
  }

  const createChapterAction: TCreateChapterServiceRequest['action'] = {
    createChapter
  }

  it('should throw about id required', () => {
    const sut = GetChapterByIdService({
      action: getChapterAction,
      chapterId: ''
    })

    expect(sut).rejects.toThrow(throwChapterMessages.idRequired)
  })

  it('should throw about chapter not fount', () => {
    const sut = GetChapterByIdService({
      action: getChapterAction,
      chapterId: 'unexpected id'
    })

    expect(sut).rejects.toThrow(throwChapterMessages.notFount)
  })

  it('should return a existent chapter by your id', async () => {
    const existentChapter = await CreateChapterService({
      action: createChapterAction,
      chapter: chapterMock
    })

    const sut = await GetChapterByIdService({
      action: getChapterAction,
      chapterId: existentChapter.id
    })

    expect(sut.chapterTitle).toStrictEqual(existentChapter.chapterTitle)
  })
})
