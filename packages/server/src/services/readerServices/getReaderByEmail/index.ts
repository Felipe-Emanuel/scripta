import { throwReaderMessages } from '@entities/Reader/utils'
import { throwUserMessages } from '@entities/User/utils'
import { User } from '@prisma/client'
import { IReaderRepository } from '@repositories'

type TOmitedFromUser =
  | 'password'
  | 'accessToken'
  | 'rule'
  | 'expirationTime'
  | 'createdAt'
  | 'updatedAt'

export type TGetReaderByEmailRequest = {
  action: Pick<IReaderRepository, 'getReaderFromEmail'>
  readerEmail: string
}

type TFormattedUser = {
  hits: number
  booksCount: number
} & Omit<User, TOmitedFromUser>

export type TGetReaderByEmailResponse = TFormattedUser

export const GetReaderByEmailService = async ({
  action,
  readerEmail
}: TGetReaderByEmailRequest): Promise<TGetReaderByEmailResponse> => {
  const { getReaderFromEmail } = action

  if (!readerEmail) throw new Error(throwReaderMessages.invalidEmail)

  const existentReader = await getReaderFromEmail(readerEmail)

  if (!existentReader) throw new Error(throwUserMessages.userNotFound)

  const formattedReader: TGetReaderByEmailResponse = {
    email: existentReader.userEmail,
    id: existentReader.id,
    name: existentReader.userName,
    picture: existentReader.picture,
    portfolioUrl: existentReader.portfolioUrl,
    hits: existentReader.books.reduce((acc, book) => acc + book.hits, 0),
    booksCount: existentReader.books.length
  }

  return formattedReader
}
