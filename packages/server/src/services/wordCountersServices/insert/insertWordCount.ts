import { TWordCounter } from '@types'
import { WordsCounterEntitie } from 'src/entities/WordsCounter/WordsCounterEntitie'
import { throwWordsCounterMessages } from 'src/entities/WordsCounter/utils'
import { IWordCounterRepository } from 'src/repositories/WordCounterRepository'
import { v4 as uuidv4 } from 'uuid'

export type TInsertWordCountServiceRequest = {
  action: Pick<IWordCounterRepository, 'insertWordCount' | 'getCounterByEmail'>
  email: string
  words: number
}

export type TInsertWordCountServiceResponse = TWordCounter

export const InsertWordCountService = async ({
  action,
  words,
  email,
}: TInsertWordCountServiceRequest): Promise<TInsertWordCountServiceResponse> => {
  const { insertWordCount, getCounterByEmail } = action

  const existingWordCounter = await getCounterByEmail(email)

  if (!existingWordCounter)
    throw new Error(throwWordsCounterMessages.wordCounterNotFount)

  const { insertWordCount: insert, setWordCount } = WordsCounterEntitie(
    existingWordCounter,
    existingWordCounter.wordCount[0].email,
  )

  const newWordCount = await setWordCount({
    id: uuidv4(),
    createdAt: new Date(),
    updatedAt: new Date(),
    words,
    email,
    wordsCounterId: existingWordCounter.wordCount[0].wordsCounterId,
  })

  const insertedCounter = await insert(newWordCount)

  await insertWordCount(newWordCount)

  return insertedCounter
}
