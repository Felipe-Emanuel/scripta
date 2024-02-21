import { WordCount } from '@prisma/client'

export interface IWordCountRepository {
  createWordCount: (wordCount: WordCount) => Promise<WordCount[]>
  getWordCountByUserEmail: (email: string) => Promise<WordCount | null>
  updateWordCount: (email: string, words: number) => Promise<WordCount | null>
}
