import { throwWordCountMessages } from 'src/entities/WordCountEntitie/utils'
import { IWordCountRepository } from 'src/repositories/WordCountRepository'
import { inMemoryWordCountRepository } from 'src/repositories/inMemory/inMemoryWordCountRepository'
import { userMock } from 'src/services/userServices/mock'
import { CreateWordCountService } from 'src/services/wordCountServices/create/createWordCount'
import { getWordCountByUserEmailService } from 'src/services/wordCountServices/getById/getWordCount'

describe('getWordCountByUserEmailService', () => {
  const { getWordCountByUserEmail, createWordCount, updateWordCount } =
    inMemoryWordCountRepository()

  const actions: IWordCountRepository = {
    getWordCountByUserEmail,
    createWordCount,
    updateWordCount,
  }

  const action: Pick<IWordCountRepository, 'getWordCountByUserEmail'> = {
    getWordCountByUserEmail,
  }

  it('should throw a exception about word count not found', () => {
    const sut = getWordCountByUserEmailService({
      action,
      email: userMock.email,
    })

    expect(sut).rejects.toThrow(throwWordCountMessages.wordCountNotFound)
  })

  it('should be able to return a existent word count', async () => {
    const words = 1500

    await CreateWordCountService({
      actions,
      email: userMock.email,
      words,
    })

    const sut = await getWordCountByUserEmailService({
      action,
      email: userMock.email,
    })

    expect(sut.words).toEqual(words)
  })

  it('should throw a exception about missing user ID', () => {
    const sut = getWordCountByUserEmailService({
      action,
      email: '',
    })

    expect(sut).rejects.toThrow(throwWordCountMessages.emailReferenceMissing)
  })
})
