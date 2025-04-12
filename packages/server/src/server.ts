import fastify from 'fastify'
import cors from '@fastify/cors'
import { routes } from 'src/routes'
import {
  validatorCompiler,
  serializerCompiler,
  ZodTypeProvider,
  jsonSchemaTransform
} from 'fastify-type-provider-zod'
import { fastifySwagger } from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Scripta API',
      version: '2.0.0'
    }
  },
  transform: jsonSchemaTransform
})

app.register(fastifySwaggerUi, {
  routePrefix: '/docs'
})

routes(app)

app.register(cors, {
  origin: true
})

app
  .listen({
    port: 3333,
    host: '0.0.0.0'
  })
  .then(() => console.log('✨Server is live✨'))
