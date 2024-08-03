import { FastifyInstance } from 'fastify'
import { CreateChapterService, TCreateChapterServiceRequest } from '@services'
import { databaseChapterRepository } from '@repositories'
import { authorization } from 'src/middlewares'
import { globalErrorMessage } from '@utils'

export async function chapterController(app: FastifyInstance): Promise<void> {
  const { createChapter } = databaseChapterRepository()

  const actionCreateChapter: TCreateChapterServiceRequest['action'] = {
    createChapter
  }

  app.post('/chapter', async (req, apply) => {
    const { chapter } = req.body as Partial<TCreateChapterServiceRequest>

    const provider = req.headers.provider
    const accessToken = req.headers.authorization

    await authorization(provider, accessToken, apply)

    const newChapter = await CreateChapterService({
      action: actionCreateChapter,
      chapter
    })

    try {
      apply.send(newChapter)
    } catch {
      apply.status(500).send({ message: globalErrorMessage.unexpected })
    }
  })
}
