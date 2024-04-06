import { TGetUserByEmailServiceResponse } from '@types'
import { UserEntitie } from 'src/entities/User'
import { throwUserMessages } from 'src/entities/User/utils'
import { IUserRepository } from 'src/repositories/UserRepository'

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
  includeReaders,
}: TGetByEmailRequest): Promise<TGetUserByEmailServiceResponse> => {
  const { getUserByEmail } = action
  if (!email) throw new Error(throwUserMessages.wrongEmailOrPassword)

  const existingUser = await getUserByEmail(email, includeBook, includeReaders)

  if (!existingUser) throw new Error(throwUserMessages.userNotFound)

  const { getUserByEmail: getByEmail } = UserEntitie(existingUser)

  const user = await getByEmail(email)

  return user
}
