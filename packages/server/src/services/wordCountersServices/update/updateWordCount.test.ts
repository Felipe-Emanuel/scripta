import { wordsCounterEntitieMock } from 'src/entities/WordsCounter/mocks/wordsCounterEntitieMock'
import { throwWordsCounterMessages } from 'src/entities/WordsCounter/utils'
import { IWordCounterRepository } from 'src/repositories/WordCounterRepository'
import { inMemoryWordCounterRepository } from 'src/repositories/inMemory/inMemoryWordCounterRepository'
import { UpdatetWordCountService } from 'src/services/wordCountersServices/update/updateWordCount'

describe('UpdatetWordCountService', () => {
  const { createWordCounter, getCounterByEmail, updatedWordCounter } =
    inMemoryWordCounterRepository()

  const action: Pick<
    IWordCounterRepository,
    'updatedWordCounter' | 'getCounterByEmail'
  > = {
    getCounterByEmail,
    updatedWordCounter,
  }

  const wordCount = wordsCounterEntitieMock.wordCount[0]

  const { updatedAt } = wordCount

  const updatedWords = 150

  it('should throw about word counter not found', () => {
    const sut = UpdatetWordCountService({
      action,
      updatedAt,
      wordCount,
      words: updatedWords,
    })

    expect(sut).rejects.toThrow(throwWordsCounterMessages.wordCounterNotFount)
  })

  it('should be able to update a existent wordCount', async () => {
    const wordCounter = await createWordCounter(wordCount)

    const sut = await UpdatetWordCountService({
      action,
      updatedAt,
      wordCount: wordCounter.wordCount[0],
      words: updatedWords,
    })

    expect(sut.words).toEqual(updatedWords)
  })
})
