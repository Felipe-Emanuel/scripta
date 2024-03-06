import { User } from '@prisma/client'
import { UserEntitie } from 'src/entities/User/UserEntitie'
import { throwUserMessages } from 'src/entities/User/utils'
import { IUserRepository } from 'src/repositories/UserRepository'
import { generateToken } from 'src/shared/utils/tokens'
import { v4 as uuidv4 } from 'uuid'

export type TCreateUserServiceRequest = {
  name: string
  email: string
  password: string
  actions: Pick<IUserRepository, 'createUser' | 'getUserByEmail'>
}

type TCreateUserServiceResponse = User

export const threeDays = 3 * 24 * 60 * 60 * 1000 // 3 dias
export const expirationTime = new Date(Date.now() + threeDays)

export const CreateUserService = async ({
  email,
  name,
  password,
  actions,
}: TCreateUserServiceRequest): Promise<TCreateUserServiceResponse> => {
  const { createUser, getUserByEmail } = actions

  const existingUser = await getUserByEmail(email)

  if (existingUser) throw new Error(throwUserMessages.userAlreadyExist)

  const payload = {
    sub: email,
  }

  const { setUser } = UserEntitie({
    id: uuidv4(),
    email,
    name,
    password,
    createdAt: new Date(),
    updatedAt: new Date(),
    picture: '',
    rule: 'client',
    expirationTime,
    accessToken: generateToken(payload),
  })

  const newUser = await setUser()

  await createUser(newUser)

  return newUser
}
