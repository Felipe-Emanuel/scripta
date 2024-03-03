import { wordsCounterEntitieMock } from 'src/entities/WordsCounter/mocks/wordsCounterEntitieMock'
import { throwWordsCounterMessages } from 'src/entities/WordsCounter/utils'
import { inMemoryWordCounterRepository } from 'src/repositories/inMemory/inMemoryWordCounterRepository'
import {
  TGetByIdWordCounterRequest,
  GetByIdWordCounterService,
} from 'src/services/wordCountersServices/getById/getByIdWordCounter'

describe('GetByIdWordCounterService', () => {
  const { getCounterById, createWordCounter } = inMemoryWordCounterRepository()

  const action: TGetByIdWordCounterRequest['action'] = {
    getCounterById,
  }

  it('should throw exception about counter not founf', () => {
    const sut = GetByIdWordCounterService({
      action,
      email: wordsCounterEntitieMock.wordCount[0].email,
      wordCounterId: 'unexistentWordCounterId',
    })

    expect(sut).rejects.toThrow(throwWordsCounterMessages.wordCounterNotFount)
  })

  it('should return a existent word count by your id', async () => {
    const wordCounter = await createWordCounter(
      wordsCounterEntitieMock.wordCount[0],
      wordsCounterEntitieMock.id,
    )

    const sut = await GetByIdWordCounterService({
      action,
      email: wordCounter.wordCount[0].email,
      wordCounterId: wordCounter.id,
    })

    expect(sut).toEqual(wordCounter)
  })
})
