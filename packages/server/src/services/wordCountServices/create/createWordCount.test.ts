import { WordCount } from '@prisma/client'
import { randomUUID } from 'crypto'
import { throwWordCountMessages } from 'src/entities/WordCountEntitie/utils'
import { inMemoryWordCountRepository } from 'src/repositories/inMemory/inMemoryWordCountRepository'
import { userMock } from 'src/services/userServices/mock'
import {
  CreateWordCountService,
  TCreateWordCountRequest,
} from 'src/services/wordCountServices/create/createWordCount'

describe('Create Word Count', () => {
  const { createWordCount, getWordCountByUserEmail, updateWordCount } =
    inMemoryWordCountRepository()

  const actions = {
    createWordCount,
    getWordCountByUserEmail,
    updateWordCount,
  }

  const body: TCreateWordCountRequest = {
    email: userMock.email,
    words: 850,
    actions,
  }

  beforeEach(() => jest.clearAllMocks())

  it('should create a new word count', async () => {
    const newWordCount: WordCount = {
      ...body,
      id: randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const sut = await CreateWordCountService(body)

    expect(sut.words).toEqual(newWordCount.words)
  })

  it('should throw error by existing word count', async () => {
    const sut = CreateWordCountService(body)

    expect(sut).rejects.toThrow(throwWordCountMessages.wordCountAlreadyExist)
  })
})
