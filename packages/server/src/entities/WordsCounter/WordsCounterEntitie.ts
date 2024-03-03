import { WordCount } from '@prisma/client'
import { TWordCounter } from '@types'
import { throwWordsCounterMessages } from 'src/entities/WordsCounter/utils'
import { isToday } from 'src/shared/utils/dates'

export const WordsCounterEntitie = (
  wordsCounter: TWordCounter,
  email: string,
) => {
  const createNewWordCount = async (
    wordCount: WordCount,
  ): Promise<TWordCounter> => {
    if (wordCount.email !== email)
      throw new Error(throwWordsCounterMessages.emailReferenceMissing)

    return wordsCounter
  }

  const setWordCount = async (
    wordsCounterId: string,
    wordCount: WordCount,
  ): Promise<WordCount> => {
    if (wordCount.wordsCounterId !== wordsCounterId)
      throw new Error(throwWordsCounterMessages.wordCounterNotFount)

    return wordCount
  }

  const getWordsCounterById = async (id: string): Promise<TWordCounter> => {
    if (!id) throw new Error(throwWordsCounterMessages.idMissing)

    if (wordsCounter.id !== id)
      throw new Error(throwWordsCounterMessages.wordCounterNotFount)

    return wordsCounter
  }

  const updatedWordCounter = async (
    updatedAt: Date,
    words: number,
    wordCount: WordCount,
  ): Promise<WordCount> => {
    if (!isToday(updatedAt))
      throw new Error(throwWordsCounterMessages.invalidDate)

    if (wordCount.email !== email)
      throw new Error(throwWordsCounterMessages.emailReferenceMissing)

    if (words <= 100)
      throw new Error(throwWordsCounterMessages.lowNumberOfWords)

    return {
      ...wordCount,
      words,
    }
  }

  const insertWordCount = async (
    wordsCounterId: string,
    wordCount: WordCount,
  ): Promise<TWordCounter> => {
    if (wordCount.wordsCounterId !== wordsCounterId)
      throw new Error(throwWordsCounterMessages.wordCounterNotFount)

    return {
      id: wordsCounter.id,
      wordCount: [...wordsCounter.wordCount, wordCount],
    }
  }

  return {
    createNewWordCount,
    getWordsCounterById,
    updatedWordCounter,
    insertWordCount,
    setWordCount,
  }
}
