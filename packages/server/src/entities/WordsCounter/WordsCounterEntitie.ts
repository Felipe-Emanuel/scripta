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

  const setWordCount = async (wordCount: WordCount): Promise<WordCount> => {
    if (wordCount.email !== email)
      throw new Error(throwWordsCounterMessages.wordCounterNotFount)

    return wordCount
  }

  const getWordsCounterByEmail = async (
    email: string,
  ): Promise<TWordCounter> => {
    if (!email) throw new Error(throwWordsCounterMessages.idMissing)

    if (wordsCounter.email !== email)
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

    return {
      ...wordCount,
      words,
    }
  }

  const insertWordCount = async (
    wordCount: WordCount,
  ): Promise<TWordCounter> => {
    if (wordCount.email !== email)
      throw new Error(throwWordsCounterMessages.wordCounterNotFount)

    return {
      id: wordsCounter.id,
      email: wordsCounter.email,
      wordCount: [...wordsCounter.wordCount, wordCount],
    }
  }

  const updateWordGoals = async (wordGoals: number): Promise<WordCount> => {
    if (wordGoals <= wordsCounter.wordCount[0].words)
      throw new Error(throwWordsCounterMessages.invalidGoal)

    return {
      ...wordsCounter.wordCount[0],
      wordGoals,
    }
  }

  return {
    createNewWordCount,
    getWordsCounterByEmail,
    updatedWordCounter,
    insertWordCount,
    setWordCount,
    updateWordGoals,
  }
}
