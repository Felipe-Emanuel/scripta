import { User } from '@prisma/client'
import { IUserRepository } from '@repositories'
import { throwUserMessages } from '@utils'

export type TGetByUserIdServiceRequest = {
  userid: string
  action: Pick<IUserRepository, 'getByUserId'>
}

type TGetByUserIdServiceResponse = User

export const GetByUserIdService = async ({
  userid,
  action
}: TGetByUserIdServiceRequest): Promise<TGetByUserIdServiceResponse> => {
  const { getByUserId } = action
  if (!userid) throw new Error(throwUserMessages.userNotFound)

  const existingUser = await getByUserId(userid)

  if (!existingUser) throw new Error(throwUserMessages.userNotFound)

  return existingUser
}
