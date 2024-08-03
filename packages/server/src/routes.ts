import { FastifyInstance } from 'fastify'
import * as controllers from '@controllers'

export const routes = (app: FastifyInstance) => {
  Object.values(controllers).forEach((controller) => {
    app.register(controller)
  })
}
