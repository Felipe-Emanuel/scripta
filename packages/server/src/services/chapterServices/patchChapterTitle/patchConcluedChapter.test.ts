import { inMemoryChapterRepository } from '@repositories'
import { PatchChapterTitleService, TPatchChapterTitleServiceRequest } from '.'
import { CreateChapterService, TCreateChapterServiceRequest } from '../create'
import { chapterMock } from '~/src/shared/mocks'

describe('PatchChapterTitleService', () => {
  const { patchChapterTitle, createChapter } = inMemoryChapterRepository()
  const createChapterAction: TCreateChapterServiceRequest['action'] = {
    createChapter
  }
  const patchConcluedChapterAction: TPatchChapterTitleServiceRequest['actions'] = {
    patchChapterTitle
  }

  it('should return a existent chapter by your id', async () => {
    const newChapterTitle = 'updated new title'

    const existentChapter = await CreateChapterService({
      action: createChapterAction,
      chapter: chapterMock
    })

    const sut = await PatchChapterTitleService({
      actions: patchConcluedChapterAction,
      chapterId: existentChapter.id,
      body: {
        title: newChapterTitle
      }
    })

    expect(sut.chapterTitle).not.toEqual(chapterMock.chapterTitle)
    expect(sut.chapterTitle).toEqual(newChapterTitle)
  })
})
