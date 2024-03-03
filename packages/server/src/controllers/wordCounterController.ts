import { FastifyInstance } from 'fastify'
import { authorization } from 'src/controllers/utils'
import { throwUserMessages } from 'src/entities/User/utils'
import { throwWordsCounterMessages } from 'src/entities/WordsCounter/utils'
import { IUserRepository } from 'src/repositories/UserRepository'
import { IWordCounterRepository } from 'src/repositories/WordCounterRepository'
import { databaseUserRepository } from 'src/repositories/database/databaseUserRepository'
import { databaseWordCounterRepository } from 'src/repositories/database/databaseWordCounterRepository'
import { GetByEmailService } from 'src/services/userServices/getByEmail/getByEmail'
import {
  TCreateCreateWordCountersServicesRequest,
  CreateWordCountersServices,
} from 'src/services/wordCountersServices/create/createWordCounter'
import { GetByIdWordCounterService } from 'src/services/wordCountersServices/getById/getByIdWordCounter'
import { InsertWordCountService } from 'src/services/wordCountersServices/insert/insertWordCount'
import { UpdatetWordCountService } from 'src/services/wordCountersServices/update/updateWordCount'

import { isToday } from 'src/shared/utils/dates'
import { globalErrorMessage } from 'src/shared/utils/globalErrorMessage'

type TBody = {
  wordCounterId: string
} & TCreateCreateWordCountersServicesRequest

export async function wordCounterController(
  app: FastifyInstance,
): Promise<void> {
  const {
    createWordCounter,
    getCounterById,
    updatedWordCounter,
    insertWordCount,
  } = databaseWordCounterRepository()
  const { getUserByEmail } = databaseUserRepository()

  const getUserByEmailAction: Pick<IUserRepository, 'getUserByEmail'> = {
    getUserByEmail,
  }

  const updatetWordCountAction: Pick<
    IWordCounterRepository,
    'updatedWordCounter' | 'getCounterById'
  > = {
    getCounterById,
    updatedWordCounter,
  }

  const insertWordCountAction: Pick<
    IWordCounterRepository,
    'insertWordCount' | 'getCounterById'
  > = {
    getCounterById,
    insertWordCount,
  }

  app.post('/wordCount', async (req, apply) => {
    try {
      const { words, wordCounterId, email } = req.body as TBody
      const provider = req.headers.provider
      const accessToken = req.headers.authorization

      await authorization(provider, accessToken, apply)

      const existingUser = await GetByEmailService({
        action: getUserByEmailAction,
        email,
      })

      if (!wordCounterId)
        apply.status(404).send({ message: throwWordsCounterMessages.idMissing })

      const creeateWordCounterActions: TCreateCreateWordCountersServicesRequest['action'] =
        {
          createWordCounter,
          getCounterById,
        }

      const newWordCount = await CreateWordCountersServices({
        action: creeateWordCounterActions,
        email,
        wordCounterId,
        words,
      })

      if (!existingUser)
        apply.status(404).send({ message: throwUserMessages.userNotFound })

      const lastCounterCreatedAt = newWordCount.wordCount[0].updatedAt

      if (isToday(lastCounterCreatedAt)) {
        const updatedWordCount = await UpdatetWordCountService({
          action: updatetWordCountAction,
          updatedAt: lastCounterCreatedAt,
          wordCount: newWordCount.wordCount[0],
          wordCountId: newWordCount.id,
          words,
        })

        apply.send(updatedWordCount)
      } else {
        const insertedCounter = await InsertWordCountService({
          action: insertWordCountAction,
          wordCountId: newWordCount.id,
          words,
        })

        apply.send(insertedCounter)
      }

      apply.send(newWordCount)
    } catch (err) {
      apply.status(500).send({ message: globalErrorMessage.unexpected })
    }
  })

  app.get('/wordCount/:wordCounterId', async (req, apply) => {
    const { wordCounterId, email } = req.params as Partial<TBody>
    const provider = req.headers.provider
    const accessToken = req.headers.authorization

    await authorization(provider, accessToken, apply)

    const getWordCounterByEmail: Pick<
      IWordCounterRepository,
      'getCounterById'
    > = {
      getCounterById,
    }

    const wordCounters = await GetByIdWordCounterService({
      action: getWordCounterByEmail,
      email,
      wordCounterId,
    })

    if (!wordCounters) {
      return apply.send([])
    }

    apply.send(wordCounters)
  })
}
