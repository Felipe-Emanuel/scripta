import { TFastifyInstance } from '@types'
import { throwUserMessages } from 'src/entities/User/utils'
import { databaseUserRepository } from '@repositories'
import { CreateUserService, TCreateUserServiceRequest } from '@services'
import { createUserSchema } from '@schemas'

export async function userController(app: TFastifyInstance): Promise<void> {
  const { createUser, getUserByEmail } = databaseUserRepository()

  const actions: TCreateUserServiceRequest['actions'] = {
    createUser,
    getUserByEmail
  }

  app.post('/users', createUserSchema, async (req, apply) => {
    const { name, password, hasProvider, email } = req.body

    const user = await CreateUserService({
      email,
      name,
      password,
      actions,
      hasProvider
    })

    if (hasProvider) apply.status(200).send({ message: throwUserMessages.providerAuthenticated })

    if (!user) {
      apply.status(404).send({ message: throwUserMessages.userNotFound })
    }

    const userResponse = {
      ...user,
      expirationTime: user.expirationTime.toISOString(),
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString()
    }

    apply.status(201).send(userResponse)
  })
}
