import { FastifyInstance } from 'fastify'
import { authController } from 'src/controllers/authController'
import { goalsController } from 'src/controllers/goalsController'
import { userController } from 'src/controllers/userController'
import { wordCounterController } from 'src/controllers/wordCounterController'

export const routes = (app: FastifyInstance) => {
  app.register(userController)
  app.register(authController)
  app.register(wordCounterController)
  app.register(goalsController)
}
