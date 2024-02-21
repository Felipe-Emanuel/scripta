import { throwWordCountMessages } from 'src/entities/WordCountEntitie/utils'
import { IWordCountRepository } from 'src/repositories/WordCountRepository'
import { inMemoryWordCountRepository } from 'src/repositories/inMemory/inMemoryWordCountRepository'
import { userMock } from 'src/services/userServices/mock'
import { CreateWordCountService } from 'src/services/wordCountServices/create/createWordCount'
import { GetWordCountByUserIdService } from 'src/services/wordCountServices/getById/getWordCount'

describe('GetWordCountByUserIdService', () => {
  const { getWordCountByUserId, createWordCount, updateWordCount } =
    inMemoryWordCountRepository()

  const actions: IWordCountRepository = {
    getWordCountByUserId,
    createWordCount,
    updateWordCount,
  }

  const action: Pick<IWordCountRepository, 'getWordCountByUserId'> = {
    getWordCountByUserId,
  }

  it('should throw a exception about word count not found', () => {
    const sut = GetWordCountByUserIdService({
      action,
      userId: userMock.id,
    })

    expect(sut).rejects.toThrow(throwWordCountMessages.wordCountNotFound)
  })

  it('should be able to return a existent word count', async () => {
    const words = 1500

    await CreateWordCountService({
      actions,
      userId: userMock.id,
      words,
    })

    const sut = await GetWordCountByUserIdService({
      action,
      userId: userMock.id,
    })

    expect(sut.words).toEqual(words)
  })

  it('should throw a exception about missing user ID', () => {
    const sut = GetWordCountByUserIdService({
      action,
      userId: '',
    })

    expect(sut).rejects.toThrow(throwWordCountMessages.userIdReferenceMissing)
  })
})
