import { TFastifyInstance } from '@types'
import { databaseUserRepository } from '@repositories'
import {
  CheckUserIsValidService,
  CreateUserService,
  TCheckUserIsValidServiceRequest,
  TCreateUserServiceRequest
} from '@services'
import { createUserSchema } from '@schemas'
import { generateStrongPass, globalErrorMessage, throwUserMessages, verifyToken } from '@utils'
import { v4 as uuidv4 } from 'uuid'

export async function userController(app: TFastifyInstance): Promise<void> {
  const { createUser, getUserByEmail } = databaseUserRepository()

  const actions: TCreateUserServiceRequest['actions'] = {
    createUser
  }

  const checkUserIsValidActions: TCheckUserIsValidServiceRequest['action'] = {
    getUserByEmail
  }

  app.post('/users', createUserSchema, async (req, reply) => {
    try {
      const { user, token } = req.body

      let existentUser = null
      let providedOAuthUser = null

      if (token) {
        // se a conta foi criada a partir de algum oAuth2
        const userByProvder = await verifyToken(token)

        const existentProvidedUser = await CheckUserIsValidService({
          action: checkUserIsValidActions,
          email: userByProvder.email,
          id: userByProvder.id
        })

        existentUser = existentProvidedUser
        providedOAuthUser = userByProvder
      }

      if (!token) {
        // se fez a conta com email e senha na plataforma
        const existentWithoutProvider = await CheckUserIsValidService({
          action: checkUserIsValidActions,
          email: user?.email
        })

        existentUser = existentWithoutProvider
      }

      if (existentUser) {
        return reply.status(200).send({ message: throwUserMessages.userAlreadyExist })
      }

      const newUser = await CreateUserService({
        newUser: {
          email: providedOAuthUser?.email || user.email,
          name: providedOAuthUser?.name || user.name,
          password: token ? generateStrongPass() : user?.password,
          accessToken: token,
          picture: providedOAuthUser?.picture || null,
          id: providedOAuthUser?.id || uuidv4()
        },
        actions
      })

      reply.status(201).send({
        accessToken: newUser.accessToken,
        expirationTime: newUser.expirationTime.toString(),
        name: newUser.name,
        picture: newUser.picture || null
      })
    } catch {
      reply.status(500).send({ message: globalErrorMessage.unexpected })
    }
  })
}
