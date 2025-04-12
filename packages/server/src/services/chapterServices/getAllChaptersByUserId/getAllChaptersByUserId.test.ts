import { inMemoryChapterRepository } from '@repositories'
import { GetAllChaptersByUserIdService, TGetAllChaptersByUserIdRequest } from '.'
import { chapterMock, userEntitieMock } from '~/src/shared/mocks'
import { CreateChapterService, TCreateChapterServiceRequest } from '../create'

describe('getAllChaptersByUserId', () => {
  const { getAllUpdatedChapters, createChapter } = inMemoryChapterRepository()

  const action: TGetAllChaptersByUserIdRequest['action'] = {
    getAllUpdatedChapters
  }

  const createChapterAction: TCreateChapterServiceRequest['action'] = {
    createChapter
  }

  it('should return an empty array when no chapters are found for the given userId', async () => {
    const sut = await GetAllChaptersByUserIdService({
      action,
      userId: 'wrong id'
    })

    expect(sut).toStrictEqual([])
  })

  it('should return an empty array when no chapters are found for the given userId', async () => {
    await CreateChapterService({
      action: createChapterAction,
      chapter: {
        ...chapterMock,
        // @ts-expect-error chapter não espera receber datas diretamente, isso é feito no banco, é apenas para teste
        createdAt: new Date(),
        updatedAt: new Date()
      }
    })

    const sut = await GetAllChaptersByUserIdService({
      action,
      userId: userEntitieMock.id
    })

    expect(sut[0].id).toBe(chapterMock.id)
  })
})
