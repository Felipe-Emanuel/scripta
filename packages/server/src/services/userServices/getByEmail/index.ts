import { TGetUserByEmailServiceResponse } from '@types'
import { IUserRepository } from '@repositories'
import { throwUserMessages } from '@utils'

export type TGetByEmailRequest = {
  email: string
  action: Pick<IUserRepository, 'getUserByEmail'>
  includeBook?: boolean
  includeReaders?: boolean
}

export const GetUserByEmailService = async ({
  email,
  action,
  includeBook,
  includeReaders
}: TGetByEmailRequest): Promise<TGetUserByEmailServiceResponse> => {
  const { getUserByEmail } = action
  if (!email) throw new Error(throwUserMessages.wrongEmailOrPassword)

  const existingUser = await getUserByEmail(email, includeBook, includeReaders)

  if (!existingUser) throw new Error(throwUserMessages.userNotFound)

  return existingUser
}
