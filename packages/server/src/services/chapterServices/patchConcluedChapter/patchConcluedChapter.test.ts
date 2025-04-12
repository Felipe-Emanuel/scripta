import { inMemoryChapterRepository } from '~/src/repositories'
import { PatchConcluedChapterService, TPatchConcluedChapterServiceRequest } from '.'
import { CreateChapterService, TCreateChapterServiceRequest } from '../create'
import { chapterMock } from '~/src/shared/mocks'

describe('PatchConcluedChapterService', () => {
  const { getChapterById, createChapter, updateChapter } = inMemoryChapterRepository()
  const createChapterAction: TCreateChapterServiceRequest['action'] = {
    createChapter
  }
  const patchConcluedChapterAction: TPatchConcluedChapterServiceRequest['actions'] = {
    getChapterById,
    updateChapter
  }

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
