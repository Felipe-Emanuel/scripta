import { WordCount } from '@prisma/client'
import { userEntitieMock } from 'src/entities/User/mocks/userEntitieMock'
import { WordCountEntitie } from 'src/entities/WordCountEntitie/WordCountEntitie'
import { WordCountEntitieMock } from 'src/entities/WordCountEntitie/mocks/WordCountEntitieMock'
import { throwWordCountMessages } from 'src/entities/WordCountEntitie/utils'

describe('setWordCount', () => {
  beforeEach(() => jest.clearAllMocks())

  it('should throw a exception about email reference missing', () => {
    const { setWordCount } = WordCountEntitie(WordCountEntitieMock, '')

    const sut = setWordCount()

    expect(sut).rejects.toThrow(throwWordCountMessages.emailReferenceMissing)
  })

  it('should throw a exception about word count not found', () => {
    const { setWordCount } = WordCountEntitie(
      WordCountEntitieMock,
      'unexistentEmail',
    )

    const sut = setWordCount()

    expect(sut).rejects.toThrow(throwWordCountMessages.wordCountNotFound)
  })

  it('should throw a exception about words missing', () => {
    const wordCountWithWordMissing: WordCount = {
      ...WordCountEntitieMock,
      words: 0,
    }

    const { setWordCount } = WordCountEntitie(
      wordCountWithWordMissing,
      userEntitieMock.email,
    )

    const sut = setWordCount()

    expect(sut).rejects.toThrow(throwWordCountMessages.wordsMissing)
  })

  it('should be able to create a new WordCount', () => {
    const { setWordCount } = WordCountEntitie(
      WordCountEntitieMock,
      userEntitieMock.email,
    )

    const sut = setWordCount()

    expect(sut).resolves.toEqual(WordCountEntitieMock)
  })
})

describe('getWordCountByUserEmail', () => {
  it('should throw a exception about email reference missing when get a word count', () => {
    const { getWordCountByUserEmail } = WordCountEntitie(
      WordCountEntitieMock,
      '',
    )
    const sut = getWordCountByUserEmail()
    expect(sut).rejects.toThrow(throwWordCountMessages.emailReferenceMissing)
  })
  it('should throw a exception about user not found when get a word count', () => {
    const { getWordCountByUserEmail } = WordCountEntitie(
      WordCountEntitieMock,
      'unexistentEmail',
    )
    const sut = getWordCountByUserEmail()
    expect(sut).rejects.toThrow(throwWordCountMessages.wordCountNotFound)
  })
  it('should throw a exception about wrong date', () => {
    const { getWordCountByUserEmail } = WordCountEntitie(
      WordCountEntitieMock,
      userEntitieMock.email,
    )
    const sut = getWordCountByUserEmail(new Date(Date.now(), -1))
    expect(sut).rejects.toThrow(throwWordCountMessages.wrongDate)
  })
  it('should be able to get a existent WordCount', () => {
    const { getWordCountByUserEmail } = WordCountEntitie(
      WordCountEntitieMock,
      userEntitieMock.email,
    )
    const sut = getWordCountByUserEmail()
    expect(sut).resolves.toEqual(WordCountEntitieMock)
  })
})

describe('updateWordCount', () => {
  const words = 1500

  beforeEach(() => jest.clearAllMocks())

  it('should throw a exception about user not found', () => {
    const { updateWordCount } = WordCountEntitie(
      WordCountEntitieMock,
      'fakeEmail',
    )

    const sut = updateWordCount(words)

    expect(sut).rejects.toThrow(throwWordCountMessages.wordCountNotFound)
  })

  it('should throw a exception about missing words', () => {
    const { updateWordCount } = WordCountEntitie(
      WordCountEntitieMock,
      userEntitieMock.email,
    )

    const sut = updateWordCount(0)

    expect(sut).rejects.toThrow(throwWordCountMessages.wordsMissing)
  })

  it('should throw a exception about wrong date', () => {
    const { updateWordCount } = WordCountEntitie(
      {
        ...WordCountEntitieMock,
        updatedAt: new Date(Date.now(), -1),
      },
      userEntitieMock.email,
    )

    const sut = updateWordCount(words)

    expect(sut).rejects.toThrow(throwWordCountMessages.wrongDate)
  })

  it('should be able to update a word count', () => {
    const { updateWordCount } = WordCountEntitie(
      WordCountEntitieMock,
      userEntitieMock.email,
    )

    const sut = updateWordCount(words)

    expect(sut).resolves.toEqual({
      ...WordCountEntitieMock,
      words,
    })
  })
})

it('should', () => {
  expect(1 + 5).toBe(6)
})
