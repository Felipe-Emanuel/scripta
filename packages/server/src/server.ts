import fastify from 'fastify'
import { authController } from 'src/controllers/authController'
import { userController } from 'src/controllers/userController'

const app = fastify()

app.register(userController)
app.register(authController)

app
  .listen({
    port: 3333,
  })
  .then(() => console.log('✨Server is live✨'))
