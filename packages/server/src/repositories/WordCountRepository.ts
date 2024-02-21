import { WordCount } from '@prisma/client'

export interface IWordCountRepository {
  createWordCount: (wordCount: WordCount) => Promise<WordCount[]>
  getWordCountByUserId: (userId: string) => Promise<WordCount | null>
  updateWordCount: (userId: string, words: number) => Promise<WordCount | null>
}
