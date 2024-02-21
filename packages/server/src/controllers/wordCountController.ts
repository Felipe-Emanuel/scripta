import { WordCount } from '@prisma/client'
import { FastifyInstance } from 'fastify'
import { throwWordCountMessages } from 'src/entities/WordCountEntitie/utils'
import { databaseWordCountRepository } from 'src/repositories/database/databaseWordCountRepository'
import {
  CreateWordCountService,
  TCreateWordCountRequest,
} from 'src/services/wordCountServices/create/createWordCount'
import { globalErrorMessage } from 'src/shared/utils/globalErrorMessage'
import { verifyToken } from 'src/shared/utils/tokens'

interface IWordCountController {
  provider?: 'google' | 'facebook'
}

type TBody = IWordCountController & TCreateWordCountRequest

export async function wordCountController(app: FastifyInstance): Promise<void> {
  const { createWordCount, getWordCountByUserId, updateWordCount } =
    databaseWordCountRepository()

  const actions = {
    createWordCount,
    getWordCountByUserId,
    updateWordCount,
  }

  app.post('/wordCount', async (req, apply) => {
    const { words, userId, provider } = req.body as TBody

    const accessToken = req.headers.authorization

    let isTokenValid = false
    const decoded = accessToken && (await verifyToken(accessToken))

    if (provider) {
      isTokenValid = true
    }

    if (accessToken) {
      decoded ? (isTokenValid = true) : (isTokenValid = false)
    }

    if (!isTokenValid)
      apply.status(401).send({ message: globalErrorMessage.unauthorized })

    if (provider && accessToken)
      apply.status(409).send({ message: globalErrorMessage.conflict })

    const wordCount = await CreateWordCountService({
      actions,
      userId,
      words,
    })

    try {
      if (!wordCount) {
        apply
          .status(404)
          .send({ message: throwWordCountMessages.wordCountNotFound })
      }

      apply.send(wordCount)
    } catch (err) {
      throw new Error(globalErrorMessage.unexpected)
    }
  })

  app.get('/wordCount/:userId', async (req, apply) => {
    const { userId } = req.params as Partial<WordCount>
    const provider = req.headers.provider
    const accessToken = req.headers.authorization

    let isTokenValid = false
    const decoded = accessToken && (await verifyToken(accessToken))

    if (provider) {
      isTokenValid = true
    }

    if (accessToken) {
      decoded ? (isTokenValid = true) : (isTokenValid = false)
    }

    if (!isTokenValid)
      apply.status(401).send({ message: globalErrorMessage.unauthorized })

    try {
      const wordCount = await getWordCountByUserId(userId)

      apply.send(wordCount)
    } catch (err) {
      throw new Error(globalErrorMessage.unexpected)
    }
  })
}
