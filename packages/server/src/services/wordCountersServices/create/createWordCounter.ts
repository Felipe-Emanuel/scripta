import { WordCount } from '@prisma/client'
import { TWordCounter } from '@types'
import { WordsCounterEntitie } from 'src/entities/WordsCounter/WordsCounterEntitie'
import { IWordCounterRepository } from 'src/repositories/WordCounterRepository'

export type TCreateCreateWordCountersServicesRequest = {
  wordCounterId: string
  words: number
  email: string
  action: Pick<IWordCounterRepository, 'createWordCounter' | 'getCounterById'>
}

export type TCreateWordCountersServicesResponse = TWordCounter

export const CreateWordCountersServices = async ({
  wordCounterId,
  action,
  words,
  email,
}: TCreateCreateWordCountersServicesRequest): Promise<TCreateWordCountersServicesResponse> => {
  const { createWordCounter, getCounterById } = action

  const existentWordCounters = await getCounterById(wordCounterId)

  if (!existentWordCounters) {
    const wordCount: WordCount = {
      createdAt: new Date(),
      updatedAt: new Date(),
      email,
      id: wordCounterId,
      words,
      wordsCounterId: wordCounterId,
    }

    const newWordCounter: TWordCounter = {
      id: wordCounterId,
      wordCount: [wordCount],
    }

    const { createNewWordCount } = WordsCounterEntitie(newWordCounter, email)

    const wordCounter = await createNewWordCount(wordCount)

    await createWordCounter(wordCount, wordCounterId)

    return wordCounter
  }

  return existentWordCounters
}
