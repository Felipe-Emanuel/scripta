import { randomUUID } from 'crypto'
import { wordsCounterEntitieMock } from 'src/entities/WordsCounter/mocks/wordsCounterEntitieMock'
import { inMemoryWordCounterRepository } from 'src/repositories/inMemory/inMemoryWordCounterRepository'
import {
  TCreateCreateWordCountersServicesRequest,
  CreateWordCountersServices,
} from 'src/services/wordCountersServices/create/createWordCounter'

describe('CreateWordCountersServices', () => {
  it('should create a new word counter table', async () => {
    const { createWordCounter, getCounterById } =
      inMemoryWordCounterRepository()

    const action: TCreateCreateWordCountersServicesRequest['action'] = {
      createWordCounter,
      getCounterById,
    }

    const mockedWordCount = wordsCounterEntitieMock.wordCount[0]
    const { email } = mockedWordCount

    const sut = await CreateWordCountersServices({
      action,
      email,
      wordCounterId: randomUUID(),
      words: 5600,
    })

    expect(sut.wordCount[0].email).toEqual(email)
  })
})
