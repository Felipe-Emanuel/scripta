import { TWordCounter } from '@types'
import { WordsCounterEntitie } from 'src/entities/WordsCounter/WordsCounterEntitie'
import { throwWordsCounterMessages } from 'src/entities/WordsCounter/utils'
import { IWordCounterRepository } from 'src/repositories/WordCounterRepository'

export type TGetByIdWordCounterRequest = {
  wordCounterId: string
  email: string
  action: Pick<IWordCounterRepository, 'getCounterById'>
}

export type TGetByIdWordCounterResponse = TWordCounter

export const GetByIdWordCounterService = async ({
  wordCounterId,
  email,
  action,
}: TGetByIdWordCounterRequest): Promise<TGetByIdWordCounterResponse> => {
  const { getCounterById } = action

  const existingWordCounter = await getCounterById(wordCounterId)

  if (!existingWordCounter)
    throw new Error(throwWordsCounterMessages.wordCounterNotFount)

  const { getWordsCounterById } = WordsCounterEntitie(
    existingWordCounter,
    email,
  )

  const wordCounter = await getWordsCounterById(wordCounterId)

  await getCounterById(wordCounterId)

  return wordCounter
}
