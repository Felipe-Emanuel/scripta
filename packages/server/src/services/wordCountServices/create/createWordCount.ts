import { WordCount } from '@prisma/client'
import { WordCountEntitie } from 'src/entities/WordCountEntitie/WordCountEntitie'
import { throwWordCountMessages } from 'src/entities/WordCountEntitie/utils'
import { IWordCountRepository } from 'src/repositories/WordCountRepository'
import { v4 as uuidv4 } from 'uuid'

export type TCreateWordCountRequest = {
  email: string
  words: number
  actions: IWordCountRepository
}

type TCreateWordCountResponse = WordCount

export const CreateWordCountService = async ({
  email,
  words,
  actions,
}: TCreateWordCountRequest): Promise<TCreateWordCountResponse> => {
  const { createWordCount, getWordCountByUserEmail } = actions

  const WordCount = await getWordCountByUserEmail(email)

  if (WordCount) throw new Error(throwWordCountMessages.wordCountAlreadyExist)

  const { setWordCount } = WordCountEntitie(
    {
      id: uuidv4(),
      email,
      words,
      updatedAt: new Date(),
      createdAt: new Date(),
    },
    email,
  )

  const newWordCount = await setWordCount()

  await createWordCount(newWordCount)

  return newWordCount
}
