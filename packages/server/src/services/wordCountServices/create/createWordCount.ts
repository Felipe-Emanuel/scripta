import { WordCount } from '@prisma/client'
import { WordCountEntitie } from 'src/entities/WordCountEntitie/WordCountEntitie'
import { throwWordCountMessages } from 'src/entities/WordCountEntitie/utils'
import { IWordCountRepository } from 'src/repositories/WordCountRepository'
import { v4 as uuidv4 } from 'uuid'

export type TCreateWordCountRequest = {
  userId: string
  words: number
  actions: IWordCountRepository
}

type TCreateWordCountResponse = WordCount

export const CreateWordCountService = async ({
  userId,
  words,
  actions,
}: TCreateWordCountRequest): Promise<TCreateWordCountResponse> => {
  const { createWordCount, getWordCountByUserId } = actions

  const WordCount = await getWordCountByUserId(userId)

  if (WordCount) throw new Error(throwWordCountMessages.wordCountAlreadyExist)

  const { setWordCount } = WordCountEntitie(
    {
      id: uuidv4(),
      userId,
      words,
      updatedAt: new Date(),
      createdAt: new Date(),
    },
    userId,
  )

  const newWordCount = await setWordCount()

  await createWordCount(newWordCount)

  return newWordCount
}
