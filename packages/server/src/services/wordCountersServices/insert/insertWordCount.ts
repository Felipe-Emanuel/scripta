import { TWordCounter } from '@types'
import { WordsCounterEntitie } from 'src/entities/WordsCounter/WordsCounterEntitie'
import { throwWordsCounterMessages } from 'src/entities/WordsCounter/utils'
import { IWordCounterRepository } from 'src/repositories/WordCounterRepository'
import { v4 as uuidv4 } from 'uuid'

export type TInsertWordCountServiceRequest = {
  action: Pick<IWordCounterRepository, 'insertWordCount' | 'getCounterById'>
  wordCountId: string
  words: number
}

export type TInsertWordCountServiceResponse = TWordCounter

export const InsertWordCountService = async ({
  action,
  words,
  wordCountId,
}: TInsertWordCountServiceRequest): Promise<TInsertWordCountServiceResponse> => {
  const { insertWordCount, getCounterById } = action

  const existingWordCounter = await getCounterById(wordCountId)

  if (!existingWordCounter)
    throw new Error(throwWordsCounterMessages.wordCounterNotFount)

  const { insertWordCount: insert, setWordCount } = WordsCounterEntitie(
    existingWordCounter,
    existingWordCounter.wordCount[0].email,
  )

  const newWordCount = await setWordCount(wordCountId, {
    id: uuidv4(),
    createdAt: new Date(),
    updatedAt: new Date(),
    words,
    email: existingWordCounter.wordCount[0].email,
    wordsCounterId: wordCountId,
  })

  const insertedCounter = await insert(wordCountId, newWordCount)

  await insertWordCount(newWordCount)

  return insertedCounter
}
