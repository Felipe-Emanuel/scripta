import * as controllers from '@controllers'
import { TFastifyInstance } from '@types'

export const routes = (app: TFastifyInstance) => {
  Object.values(controllers).forEach((controller) => {
    app.register(controller)
  })
}
