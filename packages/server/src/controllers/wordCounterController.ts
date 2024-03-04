import { FastifyInstance } from 'fastify'
import { authorization } from 'src/controllers/utils'
import { throwWordsCounterMessages } from 'src/entities/WordsCounter/utils'
import { IWordCounterRepository } from 'src/repositories/WordCounterRepository'
import { databaseWordCounterRepository } from 'src/repositories/database/databaseWordCounterRepository'
import {
  TCreateCreateWordCountersServicesRequest,
  CreateWordCountersServices,
} from 'src/services/wordCountersServices/create/createWordCounter'
import { GetByEmailWordCounterService } from 'src/services/wordCountersServices/getByEmail/getByEmailWordCounter'
import { InsertWordCountService } from 'src/services/wordCountersServices/insert/insertWordCount'
import { UpdatetWordCountService } from 'src/services/wordCountersServices/update/updateWordCount'
import { UpdateWordGoalsService } from 'src/services/wordCountersServices/updateWordGoals/updateWordGoals'

import { isToday } from 'src/shared/utils/dates'
import { globalErrorMessage } from 'src/shared/utils/globalErrorMessage'

type TBody = {
  wordCounterId: string
  wordGoals: number
} & TCreateCreateWordCountersServicesRequest

export async function wordCounterController(
  app: FastifyInstance,
): Promise<void> {
  const {
    createWordCounter,
    getCounterByEmail,
    updatedWordCounter,
    insertWordCount,
    updateWordGoals,
  } = databaseWordCounterRepository()

  const updatetWordCountAction: Pick<
    IWordCounterRepository,
    'updatedWordCounter' | 'getCounterByEmail'
  > = {
    getCounterByEmail,
    updatedWordCounter,
  }

  const insertWordCountAction: Pick<
    IWordCounterRepository,
    'insertWordCount' | 'getCounterByEmail'
  > = {
    getCounterByEmail,
    insertWordCount,
  }

  const updateWordsGoalActions: Pick<
    IWordCounterRepository,
    'updateWordGoals' | 'getCounterByEmail'
  > = {
    getCounterByEmail,
    updateWordGoals,
  }

  app.post('/wordCount', async (req, apply) => {
    try {
      const { words, wordCounterId, email } = req.body as TBody
      const provider = req.headers.provider
      const accessToken = req.headers.authorization

      await authorization(provider, accessToken, apply)

      if (words < 100)
        apply
          .status(409)
          .send({ message: throwWordsCounterMessages.lowNumberOfWords })

      if (!wordCounterId)
        apply.status(404).send({ message: throwWordsCounterMessages.idMissing })

      const creeateWordCounterActions: TCreateCreateWordCountersServicesRequest['action'] =
        {
          createWordCounter,
          getCounterByEmail,
        }

      const newWordCount = await CreateWordCountersServices({
        action: creeateWordCounterActions,
        email,
        wordCounterId,
        words,
      })

      const lastCounterCreatedAt = newWordCount.wordCount[0].updatedAt

      if (isToday(lastCounterCreatedAt)) {
        const updatedWordCount = await UpdatetWordCountService({
          action: updatetWordCountAction,
          updatedAt: lastCounterCreatedAt,
          wordCount: newWordCount.wordCount[0],
          words,
        })

        apply.send(updatedWordCount)
      } else {
        const insertedCounter = await InsertWordCountService({
          action: insertWordCountAction,
          email,
          words,
        })

        apply.send(insertedCounter)
      }

      apply.send(newWordCount)
    } catch (err) {
      apply.status(500).send({ message: globalErrorMessage.unexpected })
    }
  })

  app.get('/wordCount/:email', async (req, apply) => {
    const { email } = req.params as Partial<TBody>
    const provider = req.headers.provider
    const accessToken = req.headers.authorization

    await authorization(provider, accessToken, apply)

    const getWordCounterByEmail: Pick<
      IWordCounterRepository,
      'getCounterByEmail'
    > = {
      getCounterByEmail,
    }

    const wordCounters = await GetByEmailWordCounterService({
      action: getWordCounterByEmail,
      email,
    })

    if (!wordCounters) {
      return apply.send([])
    }

    apply.send(wordCounters)
  })

  app.patch('/wordCount', async (req, apply) => {
    const { wordGoals, email } = req.body as Partial<TBody>
    const provider = req.headers.provider
    const accessToken = req.headers.authorization

    await authorization(provider, accessToken, apply)

    if (!email) throw new Error(throwWordsCounterMessages.emailReferenceMissing)

    const updatedWordCount = await UpdateWordGoalsService({
      actions: updateWordsGoalActions,
      email,
      wordGoals,
    })

    apply.send(updatedWordCount)
  })
}
