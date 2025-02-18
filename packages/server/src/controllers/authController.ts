import { databaseUserRepository } from '@repositories'
import { GetUserByEmailService } from '@services'
import { generateToken } from '@utils'
import { throwUserMessages } from '@entities/User/utils'
import { TFastifyInstance } from '@types'
import { authUserSchema } from '@schemas'

export async function authController(app: TFastifyInstance): Promise<void> {
  const { getUserByEmail } = databaseUserRepository()

  app.post('/auth', authUserSchema, async (req, apply) => {
    const { email, password } = req.body

    const user = await GetUserByEmailService({
      email,
      action: {
        getUserByEmail
      }
    })

    if (email !== user.email || password !== user.password) {
      return apply.status(401).send({ message: throwUserMessages.wrongEmailOrPassword })
    }

    if (!user) {
      return apply.status(401).send({ message: throwUserMessages.userNotFound })
    }

    const payload = {
      sub: email
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: pass, ...userWithoutPassword } = user

    return apply.status(201).send({
      ...userWithoutPassword,
      createdAt: userWithoutPassword.createdAt.toISOString(),
      updatedAt: userWithoutPassword.updatedAt.toISOString(),
      expirationTime: userWithoutPassword.expirationTime.toISOString(),
      accessToken: generateToken(payload)
    })
  })
}
