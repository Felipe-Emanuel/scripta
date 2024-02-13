import { FastifyInstance } from 'fastify'
import { throwUserMessages } from 'src/entities/User/utils'
import { databaseUserRepository } from 'src/repositories/database/databaseUserRepository'
import {
  CreateUserService,
  TCreateUserServiceRequest,
} from 'src/services/userServices/create/createUser'
import { z } from 'zod'

export async function userController(app: FastifyInstance): Promise<void> {
  const { createUser, getUserByEmail, patchUserPicture } =
    databaseUserRepository()

  const actions = {
    createUser,
    getUserByEmail,
    patchUserPicture,
  }

  app.post('/users', async (req, apply) => {
    const { name, password } = req.body as TCreateUserServiceRequest

    const userSchema = z.object({
      email: z.string().email(throwUserMessages.invalidEmail),
    })

    const { email } = userSchema.parse(req.body)

    const user = await CreateUserService({ email, name, password, actions })

    if (!user) {
      apply.status(404).send({ message: throwUserMessages.userNotFound })
    }

    apply.send(user)
  })
}
