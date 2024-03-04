import { WordsCounterEntitie } from 'src/entities/WordsCounter/WordsCounterEntitie'
import { wordsCounterEntitieMock } from 'src/entities/WordsCounter/mocks/wordsCounterEntitieMock'
import { throwWordsCounterMessages } from 'src/entities/WordsCounter/utils'

describe('createNewWordCount', () => {
  it('should create a new word count', async () => {
    const { createNewWordCount } = WordsCounterEntitie(
      wordsCounterEntitieMock,
      wordsCounterEntitieMock.wordCount[0].email,
    )

    const sut = await createNewWordCount(wordsCounterEntitieMock.wordCount[0])

    expect(sut.wordCount[0].email).toEqual(
      wordsCounterEntitieMock.wordCount[0].email,
    )
  })

  it('should throw exception about email missing', () => {
    const { createNewWordCount } = WordsCounterEntitie(
      wordsCounterEntitieMock,
      '',
    )

    const sut = createNewWordCount(wordsCounterEntitieMock.wordCount[0])

    expect(sut).rejects.toThrow(throwWordsCounterMessages.emailReferenceMissing)
  })
})

describe('getWordsCounterByEmail', () => {
  const { getWordsCounterByEmail } = WordsCounterEntitie(
    wordsCounterEntitieMock,
    wordsCounterEntitieMock.wordCount[0].email,
  )

  it('should throw exception about missing id', () => {
    const sut = getWordsCounterByEmail('')

    expect(sut).rejects.toThrow(throwWordsCounterMessages.idMissing)
  })

  it('should throw exception about word counter not found', () => {
    const sut = getWordsCounterByEmail('unexistingEmailCounterId')

    expect(sut).rejects.toThrow(throwWordsCounterMessages.wordCounterNotFount)
  })

  it('should return a existent word counter', async () => {
    const sut = await getWordsCounterByEmail(wordsCounterEntitieMock.email)

    expect(sut.wordCount[0].email).toEqual(
      wordsCounterEntitieMock.wordCount[0].email,
    )
  })
})

describe('updatedWordCounter', () => {
  const updatedWords = 6000

  const { updatedWordCounter } = WordsCounterEntitie(
    wordsCounterEntitieMock,
    wordsCounterEntitieMock.wordCount[0].email,
  )

  it('should update the words from todays word counter', async () => {
    const sut = await updatedWordCounter(
      wordsCounterEntitieMock.wordCount[0].updatedAt,
      updatedWords,
      wordsCounterEntitieMock.wordCount[0],
    )

    expect(sut.words).toEqual(updatedWords)
  })

  it('should throw a exception about missing email', () => {
    const { updatedWordCounter } = WordsCounterEntitie(
      wordsCounterEntitieMock,
      'unexistentUserEmail',
    )
    const sut = updatedWordCounter(
      wordsCounterEntitieMock.wordCount[0].updatedAt,
      90,
      wordsCounterEntitieMock.wordCount[0],
    )

    expect(sut).rejects.toThrow(throwWordsCounterMessages.emailReferenceMissing)
  })

  it('should throw a exception about low number of words', () => {
    const sut = updatedWordCounter(
      wordsCounterEntitieMock.wordCount[0].updatedAt,
      90,
      wordsCounterEntitieMock.wordCount[0],
    )

    expect(sut).rejects.toThrow(throwWordsCounterMessages.lowNumberOfWords)
  })

  it('should throw exceptions about invalid date', () => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)

    const sut = updatedWordCounter(
      tomorrow,
      90,
      wordsCounterEntitieMock.wordCount[0],
    )

    expect(sut).rejects.toThrow(throwWordsCounterMessages.invalidDate)
  })
})

describe('insertWordCount', () => {
  const { insertWordCount } = WordsCounterEntitie(
    wordsCounterEntitieMock,
    wordsCounterEntitieMock.wordCount[0].email,
  )

  it('should throw exception about word counter not found', () => {
    const { insertWordCount } = WordsCounterEntitie(
      wordsCounterEntitieMock,
      'unexistingWordCounterId',
    )

    const sut = insertWordCount(wordsCounterEntitieMock.wordCount[0])

    expect(sut).rejects.toThrow(throwWordsCounterMessages.wordCounterNotFount)
  })

  it('should return a new word count at words counter table', async () => {
    const sut = await insertWordCount(wordsCounterEntitieMock.wordCount[0])

    expect(sut.wordCount[1].email).toEqual(
      wordsCounterEntitieMock.wordCount[0].email,
    )
  })
})

describe('setWordCount', () => {
  const { setWordCount } = WordsCounterEntitie(
    wordsCounterEntitieMock,
    wordsCounterEntitieMock.wordCount[0].email,
  )

  it('should throw exception about word counter not found', () => {
    const { setWordCount } = WordsCounterEntitie(
      wordsCounterEntitieMock,
      'unexistingWordCounterId',
    )
    const sut = setWordCount(wordsCounterEntitieMock.wordCount[0])

    expect(sut).rejects.toThrow(throwWordsCounterMessages.wordCounterNotFount)
  })

  it('should be able to return a new word count', async () => {
    const sut = await setWordCount(wordsCounterEntitieMock.wordCount[0])

    expect(sut.id).toEqual(wordsCounterEntitieMock.wordCount[0].id)
  })
})

describe('updateWordGoals', () => {
  const { updateWordGoals } = WordsCounterEntitie(
    wordsCounterEntitieMock,
    wordsCounterEntitieMock.wordCount[0].email,
  )

  const { wordGoals, words } = wordsCounterEntitieMock.wordCount[0]

  it('should throw exception about invalid goal', () => {
    const invlaidGoal = wordGoals - words

    const sut = updateWordGoals(invlaidGoal)

    expect(sut).rejects.toThrow(throwWordsCounterMessages.invalidGoal)
  })

  it('should update a word goals', async () => {
    const validGoal = wordGoals + words
    const sut = await updateWordGoals(validGoal)

    expect(sut.wordGoals).toEqual(validGoal)
  })
})
