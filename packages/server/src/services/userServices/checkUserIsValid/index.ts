import { TCreateUserResponseSchema } from '@schemas'
import { IUserRepository } from '@repositories'

export type TCheckUserIsValidServiceRequest = {
  action: Pick<IUserRepository, 'getUserByEmail'>
  email: string
  id?: string
}

type TCheckUserIsValidServiceResponse = Promise<boolean | TCreateUserResponseSchema>

export const CheckUserIsValidService = async ({
  action,
  email,
  id
}: TCheckUserIsValidServiceRequest): TCheckUserIsValidServiceResponse => {
  const { getUserByEmail } = action

  const user = await getUserByEmail(email)

  if (!user) return false

  if (id && user.id !== id) return false

  const formattedUser: TCreateUserResponseSchema = {
    name: user.name,
    picture: user.picture
  }

  return formattedUser
}
