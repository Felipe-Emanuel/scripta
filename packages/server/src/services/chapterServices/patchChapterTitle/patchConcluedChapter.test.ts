import { inMemoryChapterRepository } from '~/src/repositories'
import { PatchChapterTitleService, TPatchChapterTitleServiceRequest } from '.'
import { throwChapterMessages } from '~/src/entities/Chapter/utils'
import { CreateChapterService, TCreateChapterServiceRequest } from '../create'
import { chapterMock } from '~/src/entities/Chapter/mocks'
import { jestErrorHandler } from '~/__tests__/jestErrorHandler'

describe('PatchChapterTitleService', () => {
  const { getChapterById, createChapter } = inMemoryChapterRepository()
  const createChapterAction: TCreateChapterServiceRequest['action'] = {
    createChapter
  }
  const patchConcluedChapterAction: TPatchChapterTitleServiceRequest['actions'] = {
    getChapterById
  }

  it('should throw about id required', () => {
    try {
      PatchChapterTitleService({
        actions: patchConcluedChapterAction,
        chapterId: '',
        newTitle: 'New chapter'
      })
    } catch (e) {
      jestErrorHandler({
        error: e,
        expected: throwChapterMessages.idRequired
      })
    }
  })

  it('should return a existent chapter by your id', async () => {
    const newChapterTitle = 'updated new title'

    const existentChapter = await CreateChapterService({
      action: createChapterAction,
      chapter: chapterMock
    })

    const sut = await PatchChapterTitleService({
      actions: patchConcluedChapterAction,
      chapterId: existentChapter.id,
      newTitle: newChapterTitle
    })

    expect(sut.chapterTitle).not.toEqual(chapterMock.chapterTitle)
    expect(sut.chapterTitle).toEqual(newChapterTitle)
  })
})
