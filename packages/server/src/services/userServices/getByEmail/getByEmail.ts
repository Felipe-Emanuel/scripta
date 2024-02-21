import { User } from '@prisma/client'
import { UserEntitie } from 'src/entities/User/UserEntitie'
import { throwUserMessages } from 'src/entities/User/utils'
import { IUserRepository } from 'src/repositories/UserRepository'

export type TGetByEmailRequest = {
  email: string
  action: Pick<IUserRepository, 'getUserByEmail'>
}

type TGetByEmailResponse = User

export const GetByEmailService = async ({
  email,
  action,
}: TGetByEmailRequest): Promise<TGetByEmailResponse> => {
  const { getUserByEmail } = action
  if (!email) throw new Error(throwUserMessages.wrongEmailOrPassword)

  const existingUser = await getUserByEmail(email)

  if (!existingUser) throw new Error(throwUserMessages.userNotFound)

  const { getUserByEmail: getByEmail } = UserEntitie(existingUser)

  const user = await getByEmail(email)

  await getUserByEmail(user.email)

  return user
}
