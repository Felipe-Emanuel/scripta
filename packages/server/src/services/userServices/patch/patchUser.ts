import { User } from '@prisma/client'
import { UserEntitie } from 'src/entities/User/UserEntitie'
import { throwUserMessages } from 'src/entities/User/utils'
import { inMemomoryUserRepository } from 'src/repositories/inMemory/inMemoryUserRepository'

export type TPatchUserRequest = {
  email: string
  picture: string
}

type TpatchUserResponse = User

export const PatchUserService = async ({
  email,
  picture,
}: TPatchUserRequest): Promise<TpatchUserResponse> => {
  const { patchUserPicture, getUserByEmail } = inMemomoryUserRepository()

  const existingUser = await getUserByEmail(email)

  if (!existingUser) throw new Error(throwUserMessages.userNotFound)

  const { patchUserPicture: patchPicture } = UserEntitie({
    ...existingUser,
    picture,
  })

  const updateduser = await patchPicture(email, picture)

  await patchUserPicture(email, picture)

  return updateduser
}
