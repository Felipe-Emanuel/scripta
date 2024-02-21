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
  const { createWordCount, getWordCountByUserId, updateWordCount } =
    inMemoryWordCountRepository()

  const actions = {
    createWordCount,
    getWordCountByUserId,
    updateWordCount,
  }

  const body: TCreateWordCountRequest = {
    userId: userMock.id,
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
