import { WordCount } from '@prisma/client'
import { WordCountEntitie } from 'src/entities/WordCountEntitie/WordCountEntitie'
import { throwWordCountMessages } from 'src/entities/WordCountEntitie/utils'
import { IWordCountRepository } from 'src/repositories/WordCountRepository'

export type TgetWordCountByUserEmailRequest = {
  email: string
  action: Pick<IWordCountRepository, 'getWordCountByUserEmail'>
  date?: Date
}

export type TgetWordCountByUserEmailResponse = WordCount

export const getWordCountByUserEmailService = async ({
  email,
  action,
  date,
}: TgetWordCountByUserEmailRequest): Promise<TgetWordCountByUserEmailResponse> => {
  const { getWordCountByUserEmail } = action

  if (!email) throw new Error(throwWordCountMessages.emailReferenceMissing)

  const existingWordCount = await getWordCountByUserEmail(email)

  if (!existingWordCount)
    throw new Error(throwWordCountMessages.wordCountNotFound)

  const { getWordCountByUserEmail: getWordCount } = WordCountEntitie(
    existingWordCount,
    email,
  )

  const wordCount = getWordCount(date)

  await getWordCountByUserEmail(email)

  return wordCount
}
