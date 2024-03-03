import { TWordCounter } from '@types'
import { WordsCounterEntitie } from 'src/entities/WordsCounter/WordsCounterEntitie'
import { throwWordsCounterMessages } from 'src/entities/WordsCounter/utils'
import { IWordCounterRepository } from 'src/repositories/WordCounterRepository'

export type TGetByEmailWordCounterRequest = {
  email: string
  action: Pick<IWordCounterRepository, 'getCounterByEmail'>
}

export type TGetByEmailWordCounterResponse = TWordCounter

export const GetByEmailWordCounterService = async ({
  email,
  action,
}: TGetByEmailWordCounterRequest): Promise<TGetByEmailWordCounterResponse> => {
  const { getCounterByEmail } = action

  const existingWordCounter = await getCounterByEmail(email)

  if (!existingWordCounter)
    throw new Error(throwWordsCounterMessages.wordCounterNotFount)

  const { getWordsCounterByEmail } = WordsCounterEntitie(
    existingWordCounter,
    email,
  )

  const wordCounter = await getWordsCounterByEmail(email)

  await getCounterByEmail(email)

  return wordCounter
}
