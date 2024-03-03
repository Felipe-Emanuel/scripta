import { WordCount } from '@prisma/client'
import { TWordCounter } from '@types'
import { randomUUID } from 'crypto'
import { IWordCounterRepository } from 'src/repositories/WordCounterRepository'

export const inMemoryWordCounterRepository = (): IWordCounterRepository => {
  let wordCounters: TWordCounter = {
    id: randomUUID(),
    wordCount: [],
  }

  const createWordCounter = async (
    wordCount: WordCount,
    wordCounterId: string,
  ): Promise<TWordCounter> => {
    const updatedWordCounters = (wordCounters = {
      id: wordCounterId,
      wordCount: [wordCount],
    })
    return updatedWordCounters
  }

  const getCounterById = async (id: string): Promise<TWordCounter | null> => {
    const existingWordCounter = wordCounters.id === id

    return existingWordCounter ? wordCounters : null
  }

  const updatedWordCounter = async (
    createdAt: Date,
    words: number,
    wordCount: WordCount,
  ): Promise<WordCount> => {
    const currentWordCounter = wordCounters.wordCount.find(
      (word) => word.createdAt === createdAt,
    )

    if (currentWordCounter) {
      return {
        ...currentWordCounter,
        words,
      }
    }

    return wordCount
  }

  const insertWordCount = async (
    wordCount: WordCount,
  ): Promise<TWordCounter> => {
    return {
      id: wordCounters.id,
      wordCount: [...wordCounters.wordCount, wordCount],
    }
  }

  return {
    createWordCounter,
    getCounterById,
    updatedWordCounter,
    insertWordCount,
  }
}
