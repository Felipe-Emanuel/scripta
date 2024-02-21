import { WordCount } from '@prisma/client'
import { IWordCountRepository } from 'src/repositories/WordCountRepository'

let wordCounts: WordCount[] = []

export const inMemoryWordCountRepository = (): IWordCountRepository => {
  const createWordCount = async (
    wordCount: WordCount,
  ): Promise<WordCount[]> => {
    const updatedWordCount = (wordCounts = [{ ...wordCount, ...wordCount }])
    return updatedWordCount
  }

  const getWordCountByUserId = async (
    userId: string,
  ): Promise<WordCount | null> => {
    const exisintgWordCount = wordCounts.find((word) => word.userId === userId)

    return exisintgWordCount || null
  }

  const updateWordCount = async (
    userId: string,
    words: number,
  ): Promise<WordCount | null> => {
    const exisintgWordCount = wordCounts.find((word) => word.userId === userId)

    if (exisintgWordCount) {
      return {
        ...exisintgWordCount,
        words,
      }
    }

    return null
  }

  return {
    createWordCount,
    getWordCountByUserId,
    updateWordCount,
  }
}
