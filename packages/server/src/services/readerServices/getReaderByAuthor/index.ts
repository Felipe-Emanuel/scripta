import { throwReaderMessages } from '@entities/Reader/utils'
import { Reader } from '@prisma/client'
import { IReaderRepository } from '@repositories'

export type TGetReaderByAuthorRequest = {
  action: Pick<IReaderRepository, 'getAllReadersByAuthor'>
  authorEmail: string
}

type TGetReaderByAuthorResponse = Reader[]

export const GetReaderByAuthorService = async ({
  action,
  authorEmail,
}: TGetReaderByAuthorRequest): Promise<TGetReaderByAuthorResponse> => {
  const { getAllReadersByAuthor } = action

  if (!authorEmail) throw new Error(throwReaderMessages.invalidEmail)

  const readers = await getAllReadersByAuthor(authorEmail)

  return readers
}
