import fastify from 'fastify'
import { userController } from 'src/controllers/userController'

const app = fastify()

app.register(userController)

app
  .listen({
    port: 3333,
  })
  .then(() => console.log('✨Server is live✨'))
