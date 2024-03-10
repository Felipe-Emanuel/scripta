import { databaseUserRepository } from '@repositories'
import { TCreateUserServiceRequest, GetUserByEmailService } from '@services'
import { generateToken } from '@utils'
import { FastifyInstance } from 'fastify'
import { throwUserMessages } from '@entities/User/utils'

export async function authController(app: FastifyInstance): Promise<void> {
  const { getUserByEmail } = databaseUserRepository()

  app.post('/auth', async (req, apply) => {
    const { email, password } = req.body as Partial<TCreateUserServiceRequest>

    const user = await GetUserByEmailService({
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

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: pass, ...userWithoutPassword } = user

    return apply.send({
      ...userWithoutPassword,
      accessToken: generateToken(payload),
    })
  })
}
