import { WordCount } from '@prisma/client'
import { WordsCounterEntitie } from 'src/entities/WordsCounter/WordsCounterEntitie'
import { throwWordsCounterMessages } from 'src/entities/WordsCounter/utils'
import { IWordCounterRepository } from 'src/repositories/WordCounterRepository'

export type TupdatetWordCountServiceRequest = {
  action: Pick<
    IWordCounterRepository,
    'updatedWordCounter' | 'getCounterByEmail'
  >
  updatedAt: Date
  words: number
  wordCount: WordCount
}

type TupdatetWordCountServiceResponse = WordCount

export const UpdatetWordCountService = async ({
  action,
  updatedAt,
  words,
  wordCount,
}: TupdatetWordCountServiceRequest): Promise<TupdatetWordCountServiceResponse> => {
  const { updatedWordCounter, getCounterByEmail } = action

  const existingWordCounter = await getCounterByEmail(wordCount.email)

  if (!existingWordCounter)
    throw new Error(throwWordsCounterMessages.wordCounterNotFount)

  const { updatedWordCounter: updateCounter } = WordsCounterEntitie(
    existingWordCounter,
    wordCount.email,
  )

  const updatedCounter = await updateCounter(updatedAt, words, wordCount)

  await updatedWordCounter(updatedAt, words, wordCount)

  return updatedCounter
}
