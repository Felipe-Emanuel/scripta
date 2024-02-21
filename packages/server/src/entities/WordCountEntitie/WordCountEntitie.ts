import { WordCount } from '@prisma/client'
import { throwWordCountMessages } from 'src/entities/WordCountEntitie/utils'

export const WordCountEntitie = (wordCount: WordCount, userId: string) => {
  const setWordCount = async () => {
    if (!userId) throw new Error(throwWordCountMessages.userIdReferenceMissing)

    if (wordCount.userId !== userId)
      throw new Error(throwWordCountMessages.wordCountNotFound)

    if (wordCount.words <= 0)
      throw new Error(throwWordCountMessages.wordsMissing)

    return wordCount
  }

  const getWordCountByUserId = async (date?: Date) => {
    if (!userId) throw new Error(throwWordCountMessages.userIdReferenceMissing)

    if (wordCount.userId !== userId)
      throw new Error(throwWordCountMessages.wordCountNotFound)

    if (date && wordCount.updatedAt.getDay() !== date.getDay())
      throw new Error(throwWordCountMessages.wrongDate)

    return wordCount
  }

  const updateWordCount = async (words: number) => {
    if (wordCount.userId !== userId)
      throw new Error(throwWordCountMessages.wordCountNotFound)

    if (words <= 0) throw new Error(throwWordCountMessages.wordsMissing)

    if (wordCount.updatedAt.getDay() !== new Date().getDay()) {
      throw new Error(throwWordCountMessages.wrongDate)
    }

    return { ...wordCount, words }
  }

  return { setWordCount, getWordCountByUserId, updateWordCount }
}
