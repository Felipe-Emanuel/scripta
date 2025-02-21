import fastify from 'fastify'
import cors from '@fastify/cors'
import {
  validatorCompiler,
  serializerCompiler,
  ZodTypeProvider,
  jsonSchemaTransform
} from 'fastify-type-provider-zod'
import { fastifySwagger } from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import { dailySatisfactionRateJob } from './shared/jobs/dailySatisfactionRateJob'
import { routes } from './routes'

console.log('teste')

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Scripta API',
      version: '1.0.0'
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

dailySatisfactionRateJob.start()

app
  .listen({
    port: 3333,
    host: '0.0.0.0'
  })
  .then(() => console.log('✨Server is live✨'))
