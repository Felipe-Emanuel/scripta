import { WordCount } from '@prisma/client'
import { WordCountEntitie } from 'src/entities/WordCountEntitie/WordCountEntitie'
import { throwWordCountMessages } from 'src/entities/WordCountEntitie/utils'
import { IWordCountRepository } from 'src/repositories/WordCountRepository'

export type TGetWordCountByUserIdRequest = {
  userId: string
  action: Pick<IWordCountRepository, 'getWordCountByUserId'>
  date?: Date
}

export type TGetWordCountByUserIdResponse = WordCount

export const GetWordCountByUserIdService = async ({
  userId,
  action,
  date,
}: TGetWordCountByUserIdRequest): Promise<TGetWordCountByUserIdResponse> => {
  const { getWordCountByUserId } = action

  if (!userId) throw new Error(throwWordCountMessages.userIdReferenceMissing)

  const existingWordCount = await getWordCountByUserId(userId)

  if (!existingWordCount)
    throw new Error(throwWordCountMessages.wordCountNotFound)

  const { getWordCountByUserId: getWordCount } = WordCountEntitie(
    existingWordCount,
    userId,
  )

  const wordCount = getWordCount(date)

  await getWordCountByUserId(userId)

  return wordCount
}
