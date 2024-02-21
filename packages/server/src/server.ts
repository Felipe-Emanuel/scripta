import fastify from 'fastify'
import cors from '@fastify/cors'
import { authController } from 'src/controllers/authController'
import { userController } from 'src/controllers/userController'
import { wordCountController } from 'src/controllers/wordCountController'

const app = fastify()

app.register(userController)
app.register(authController)
app.register(wordCountController)

app.register(cors, {
  origin: true,
})

app
  .listen({
    port: 3333,
  })
  .then(() => console.log('✨Server is live✨'))
