import { FastifyInstance } from 'fastify'
import { authController } from 'src/controllers/authController'
import { bookController } from 'src/controllers/bookController'
import { goalsController } from 'src/controllers/goalsController'
import { userController } from 'src/controllers/userController'

export const routes = (app: FastifyInstance) => {
  app.register(userController)
  app.register(authController)
  app.register(goalsController)
  app.register(bookController)
}
