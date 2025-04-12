import { TGenerateToken } from '@utils'
import { IUserRepository } from '@repositories'
import { generateToken } from '@utils'
import { TCreateUserBodySchema, TCreateUserResponseSchema } from '@schemas'

export type TUserEntitie = {
  id: string
  email: string
  name: string
  password: string
}

export type TCreateUserServiceRequest = {
  newUser: TCreateUserBodySchema['user'] & {
    accessToken?: string
    picture?: string
    id?: string
  }
  actions: Pick<IUserRepository, 'createUser'>
}

type TCreateUserServiceResponse = TCreateUserResponseSchema

export const oneDay = 1 * 24 * 60 * 60 * 1000 // 1 dia
export const expirationTime = new Date(Date.now() + oneDay)

export const CreateUserService = async ({
  actions,
  newUser
}: TCreateUserServiceRequest): Promise<TCreateUserServiceResponse> => {
  const { createUser } = actions
  const { email, name, password, picture, id } = newUser

  const payload: TGenerateToken = {
    id
  }

  const verifedAccessToken = newUser.accessToken ?? generateToken(payload)

  await createUser({
    id,
    email,
    name,
    password
  })

  return {
    accessToken: verifedAccessToken,
    expirationTime: expirationTime.toISOString(),
    name: newUser.name,
    picture
  }
}
