import { wordsCounterEntitieMock } from 'src/entities/WordsCounter/mocks/wordsCounterEntitieMock'
import { throwWordsCounterMessages } from 'src/entities/WordsCounter/utils'
import { IWordCounterRepository } from 'src/repositories/WordCounterRepository'
import { inMemoryWordCounterRepository } from 'src/repositories/inMemory/inMemoryWordCounterRepository'
import { UpdateWordGoalsService } from 'src/services/wordCountersServices/updateWordGoals/updateWordGoals'

describe('UpdateWordGoalsService', () => {
  const { createWordCounter, getCounterByEmail, updateWordGoals } =
    inMemoryWordCounterRepository()

  const actions: Pick<
    IWordCounterRepository,
    'updateWordGoals' | 'getCounterByEmail'
  > = {
    getCounterByEmail,
    updateWordGoals,
  }

  const wordCount = wordsCounterEntitieMock.wordCount[0]

  const { wordGoals } = wordCount

  const randomNumberToIncreaseCurrentWordCount = 500

  it('should throw about word counter not found', () => {
    const sut = UpdateWordGoalsService({
      actions,
      email: 'unexistentEmail',
      wordGoals: randomNumberToIncreaseCurrentWordCount,
    })

    expect(sut).rejects.toThrow(throwWordsCounterMessages.wordCounterNotFount)
  })

  it('should be able to update a existent word goals', async () => {
    const wordCounter = await createWordCounter(wordCount)

    const newWordGoals = wordGoals + randomNumberToIncreaseCurrentWordCount

    const sut = await UpdateWordGoalsService({
      actions,
      email: wordCounter.wordCount[0].email,
      wordGoals: newWordGoals,
    })

    expect(sut.wordGoals).toEqual(newWordGoals)
  })
})
