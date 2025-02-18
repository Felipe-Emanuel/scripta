import { User } from '@prisma/client'
import { generateStrongPass } from '@utils'
import { UserEntitie } from 'src/entities/User'
import { throwUserMessages } from 'src/entities/User/utils'
import { IUserRepository } from 'src/repositories/UserRepository'
import { generateToken } from 'src/shared/utils/tokens'
import { v4 as uuidv4 } from 'uuid'

export type TCreateUserServiceRequest = {
  name: string
  email: string
  hasProvider: boolean
  password: string
  actions: Pick<IUserRepository, 'createUser' | 'getUserByEmail'>
}

type TCreateUserServiceResponse = Omit<User, 'password'>

export const threeDays = 3 * 24 * 60 * 60 * 1000 // 3 dias
export const expirationTime = new Date(Date.now() + threeDays)

export const CreateUserService = async ({
  email,
  name,
  hasProvider,
  password,
  actions
}: TCreateUserServiceRequest): Promise<TCreateUserServiceResponse> => {
  const { createUser, getUserByEmail } = actions

  if (hasProvider) password = generateStrongPass()

  const existingUser = await getUserByEmail(email)

  if (existingUser && !hasProvider) throw new Error(throwUserMessages.userAlreadyExist)

  if (existingUser && hasProvider) return

  const payload = {
    sub: email
  }

  const { setUser } = UserEntitie({
    id: uuidv4(),
    portfolioUrl: '',
    email,
    name,
    password,
    createdAt: new Date(),
    updatedAt: new Date(),
    picture: '',
    rule: 'client',
    expirationTime,
    accessToken: generateToken(payload)
  })

  const newUser = await setUser(hasProvider)

  await createUser(newUser)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: pass, ...userWithoutPassword } = newUser

  return userWithoutPassword
}
