import { WordCount } from '@prisma/client'
import { throwWordCountMessages } from 'src/entities/WordCountEntitie/utils'

export const WordCountEntitie = (wordCount: WordCount, email: string) => {
  const setWordCount = async () => {
    if (!email) throw new Error(throwWordCountMessages.emailReferenceMissing)

    if (wordCount.email !== email)
      throw new Error(throwWordCountMessages.wordCountNotFound)

    if (wordCount.words <= 0)
      throw new Error(throwWordCountMessages.wordsMissing)

    return wordCount
  }

  const getWordCountByUserEmail = async (date?: Date) => {
    if (!email) throw new Error(throwWordCountMessages.emailReferenceMissing)

    if (wordCount.email !== email)
      throw new Error(throwWordCountMessages.wordCountNotFound)

    if (date && wordCount.updatedAt.getDay() !== date.getDay())
      throw new Error(throwWordCountMessages.wrongDate)

    return wordCount
  }

  const updateWordCount = async (words: number) => {
    if (wordCount.email !== email)
      throw new Error(throwWordCountMessages.wordCountNotFound)

    if (words <= 0) throw new Error(throwWordCountMessages.wordsMissing)

    if (wordCount.updatedAt.getDay() !== new Date().getDay()) {
      throw new Error(throwWordCountMessages.wrongDate)
    }

    return { ...wordCount, words }
  }

  return { setWordCount, getWordCountByUserEmail, updateWordCount }
}
