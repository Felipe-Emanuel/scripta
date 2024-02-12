import { User } from '@prisma/client'
import { FastifyInstance } from 'fastify'
import { throwUserMessages } from 'src/entities/User/utils'
import { databaseUserRepository } from 'src/repositories/database/databaseUserRepository'
import {
  CreateUserService,
  TCreateUserServiceRequest,
} from 'src/services/userServices/create/createUser'
import { GetByEmailService } from 'src/services/userServices/getByEmail/getByEmail'
import { z } from 'zod'

export async function userController(app: FastifyInstance): Promise<void> {
  const { createUser, getUserByEmail, patchUserPicture } =
    databaseUserRepository()

  const actions = {
    createUser,
    getUserByEmail,
    patchUserPicture,
  }

  app.post('/auth', async (req, apply) => {
    const { email, password } = req.body as User

    const user = await GetByEmailService({
      email,
      action: {
        getUserByEmail,
      },
    })

    if (email !== user.email || password !== user.password) {
      return apply
        .status(401)
        .send({ message: throwUserMessages.wrongEmailOrPassword })
    }

    if (!user) {
      return apply.status(401).send({ message: throwUserMessages.userNotFound })
    }

    return apply.send(user)
  })

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
