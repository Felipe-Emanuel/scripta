import { wordsCounterEntitieMock } from 'src/entities/WordsCounter/mocks/wordsCounterEntitieMock'
import { inMemoryWordCounterRepository } from 'src/repositories/inMemory/inMemoryWordCounterRepository'
import {
  TGetByEmailWordCounterRequest,
  GetByEmailWordCounterService,
} from 'src/services/wordCountersServices/getByEmail/getByEmailWordCounter'

describe('GetByEmailWordCounterService', () => {
  const { getCounterByEmail, createWordCounter } =
    inMemoryWordCounterRepository()

  const action: TGetByEmailWordCounterRequest['action'] = {
    getCounterByEmail,
  }

  it('should return a existent word count by your email', async () => {
    const wordCounter = await createWordCounter(
      wordsCounterEntitieMock.wordCount[0],
    )

    const sut = await GetByEmailWordCounterService({
      action,
      email: wordsCounterEntitieMock.wordCount[0].email,
    })

    expect(sut).toEqual(wordCounter)
  })
})
