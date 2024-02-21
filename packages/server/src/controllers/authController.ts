import { FastifyInstance } from 'fastify'
import { throwUserMessages } from 'src/entities/User/utils'
import { databaseUserRepository } from 'src/repositories/database/databaseUserRepository'
import { TCreateUserServiceRequest } from 'src/services/userServices/create/createUser'
import { GetByEmailService } from 'src/services/userServices/getByEmail/getByEmail'
import { generateToken } from 'src/shared/utils/tokens'

export async function authController(app: FastifyInstance): Promise<void> {
  const { getUserByEmail } = databaseUserRepository()

  app.post('/auth', async (req, apply) => {
    const { email, password } = req.body as Partial<TCreateUserServiceRequest>

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

    const payload = {
      sub: email,
    }

    return apply.send({
      ...user,
      accessToken: generateToken(payload),
    })
  })
}
