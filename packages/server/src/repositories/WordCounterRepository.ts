import { WordCount, WordsCounter } from '@prisma/client'
import { TWordCounter } from '@types'

export interface IWordCounterRepository {
  createWordCounter: (wordCount: WordCount) => Promise<TWordCounter>
  getCounterByEmail: (email: string) => Promise<TWordCounter | null>
  updatedWordCounter: (
    updatedAt: Date,
    words: number,
    wordCount: WordCount,
  ) => Promise<WordCount>
  insertWordCount: (wordCount: WordCount) => Promise<WordsCounter>
}
