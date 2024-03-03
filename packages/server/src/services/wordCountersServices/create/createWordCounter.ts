import { WordCount } from '@prisma/client'
import { TWordCounter } from '@types'
import { WordsCounterEntitie } from 'src/entities/WordsCounter/WordsCounterEntitie'
import { IWordCounterRepository } from 'src/repositories/WordCounterRepository'
import { v4 as uuidv4 } from 'uuid'

export type TCreateCreateWordCountersServicesRequest = {
  wordCounterId: string
  words: number
  email: string
  action: Pick<
    IWordCounterRepository,
    'createWordCounter' | 'getCounterByEmail'
  >
}

export type TCreateWordCountersServicesResponse = TWordCounter

export const CreateWordCountersServices = async ({
  wordCounterId,
  action,
  words,
  email,
}: TCreateCreateWordCountersServicesRequest): Promise<TCreateWordCountersServicesResponse> => {
  const { createWordCounter, getCounterByEmail } = action

  const existentWordCounters = await getCounterByEmail(email)

  if (!existentWordCounters) {
    const wordCount: WordCount = {
      id: uuidv4(),
      email,
      words,
      createdAt: new Date(),
      updatedAt: new Date(),
      wordsCounterId: wordCounterId,
    }

    const newWordCounter: TWordCounter = {
      id: wordCounterId,
      email,
      wordCount: [wordCount],
    }

    const { createNewWordCount } = WordsCounterEntitie(newWordCounter, email)

    const wordCounter = await createNewWordCount(wordCount)

    await createWordCounter(wordCount)

    return wordCounter
  }

  return existentWordCounters
}
