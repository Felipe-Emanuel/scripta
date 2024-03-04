import { WordCount } from '@prisma/client'
import { TWordCounter } from '@types'
import { randomUUID } from 'crypto'
import { IWordCounterRepository } from 'src/repositories/WordCounterRepository'

export const inMemoryWordCounterRepository = (): IWordCounterRepository => {
  let wordCounters: TWordCounter = {
    id: randomUUID(),
    email: 'user@example.com',
    wordCount: [],
  }

  const createWordCounter = async (
    wordCount: WordCount,
  ): Promise<TWordCounter> => {
    const updatedWordCounters = (wordCounters = {
      id: randomUUID(),
      email: wordCount.email,
      wordCount: [wordCount],
    })
    return updatedWordCounters
  }

  const getCounterByEmail = async (
    email: string,
  ): Promise<TWordCounter | null> => {
    const existingWordCounter = wordCounters.email === email

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
      email: wordCounters.email,
      wordCount: [...wordCounters.wordCount, wordCount],
    }
  }

  const updateWordGoals = async (
    email: string,
    wordGoals: number,
  ): Promise<WordCount> => {
    const existingWordCounter = wordCounters.wordCount.find(
      (w) => w.email === email,
    )

    return {
      ...existingWordCounter,
      wordGoals,
    }
  }

  return {
    createWordCounter,
    getCounterByEmail,
    updatedWordCounter,
    insertWordCount,
    updateWordGoals,
  }
}
