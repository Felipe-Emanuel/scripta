import { databaseUserRepository } from '@repositories'
import { GetUserByEmailService } from '@services'
import { generateToken, throwUserMessages } from '@utils'
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

    return apply.status(200).send({
      accessToken: generateToken(user),
      name: user.name,
      picture: user.picture
    })
  })
}
