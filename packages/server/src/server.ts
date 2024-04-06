import fastify from 'fastify'
import cors from '@fastify/cors'
import { dailySatisfactionRateJob } from 'src/shared/jobs/dailySatisfactionRateJob'
import { routes } from 'src/routes'

const app = fastify()

routes(app)

app.register(cors, {
  origin: true,
})

dailySatisfactionRateJob.start()

app
  .listen({
    port: 3333,
  })
  .then(() => console.log('✨Server is live✨'))
