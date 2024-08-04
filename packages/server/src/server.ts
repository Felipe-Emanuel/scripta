import fastify from 'fastify'
import cors from '@fastify/cors'
import { dailySatisfactionRateJob } from 'src/shared/jobs/dailySatisfactionRateJob'
import { routes } from 'src/routes'

const app = fastify()

routes(app)

app.register(cors, {
  origin: true
})

dailySatisfactionRateJob.start()

app.get('/', (req, apply) => {
  apply.send('Whaaaaaa')
})

app
  .listen({
    port: 3333,
    host: '0.0.0.0'
  })
  .then(() => console.log('✨Server is live✨'))
