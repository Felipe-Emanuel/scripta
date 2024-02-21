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

  const getWordCountByUserEmail = async (
    email: string,
  ): Promise<WordCount | null> => {
    const exisintgWordCount = wordCounts.find((word) => word.email === email)

    return exisintgWordCount || null
  }

  const updateWordCount = async (
    email: string,
    words: number,
  ): Promise<WordCount | null> => {
    const exisintgWordCount = wordCounts.find((word) => word.email === email)

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
    getWordCountByUserEmail,
    updateWordCount,
  }
}
