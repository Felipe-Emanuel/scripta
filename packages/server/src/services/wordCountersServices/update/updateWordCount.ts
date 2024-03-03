import { WordCount } from '@prisma/client'
import { WordsCounterEntitie } from 'src/entities/WordsCounter/WordsCounterEntitie'
import { throwWordsCounterMessages } from 'src/entities/WordsCounter/utils'
import { IWordCounterRepository } from 'src/repositories/WordCounterRepository'

export type TupdatetWordCountServiceRequest = {
  action: Pick<IWordCounterRepository, 'updatedWordCounter' | 'getCounterById'>
  wordCountId: string
  updatedAt: Date
  words: number
  wordCount: WordCount
}

export type TupdatetWordCountServiceResponse = WordCount

export const UpdatetWordCountService = async ({
  action,
  wordCountId,
  updatedAt,
  words,
  wordCount,
}: TupdatetWordCountServiceRequest): Promise<TupdatetWordCountServiceResponse> => {
  const { updatedWordCounter, getCounterById } = action

  const existingWordCounter = await getCounterById(wordCountId)

  if (!existingWordCounter)
    throw new Error(throwWordsCounterMessages.wordCounterNotFount)

  const { updatedWordCounter: updateCounter } = WordsCounterEntitie(
    existingWordCounter,
    wordCount.email,
  )

  const updatedCounter = updateCounter(updatedAt, words, wordCount)

  await updatedWordCounter(updatedAt, words, wordCount)

  return updatedCounter
}
