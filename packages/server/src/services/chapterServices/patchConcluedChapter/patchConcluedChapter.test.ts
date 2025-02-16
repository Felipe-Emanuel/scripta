import { inMemoryChapterRepository } from '~/src/repositories'
import { PatchConcluedChapterService, TPatchConcluedChapterServiceRequest } from '.'
import { throwChapterMessages } from '~/src/entities/Chapter/utils'
import { CreateChapterService, TCreateChapterServiceRequest } from '../create'
import { chapterMock } from '~/src/entities/Chapter/mocks'
import { jestErrorHandler } from '~/__tests__/jestErrorHandler'

describe('PatchConcluedChapterService', () => {
  const { getChapterById, createChapter, updateChapter } = inMemoryChapterRepository()
  const createChapterAction: TCreateChapterServiceRequest['action'] = {
    createChapter
  }
  const patchConcluedChapterAction: TPatchConcluedChapterServiceRequest['actions'] = {
    getChapterById,
    updateChapter
  }

  it('should throw about id required', async () => {
    try {
      await PatchConcluedChapterService({
        actions: patchConcluedChapterAction,
        chapterIdToBeEdited: ''
      })
    } catch (e) {
      jestErrorHandler({
        error: e,
        expected: throwChapterMessages.notFound
      })
    }
  })

  it('should return a existent chapter by your id', async () => {
    const existentChapter = await CreateChapterService({
      action: createChapterAction,
      chapter: chapterMock
    })

    const sut = await PatchConcluedChapterService({
      actions: patchConcluedChapterAction,
      chapterIdToBeEdited: existentChapter.id
    })
    expect(sut.isConclued).toStrictEqual(!existentChapter.isConclued)
  })
})
