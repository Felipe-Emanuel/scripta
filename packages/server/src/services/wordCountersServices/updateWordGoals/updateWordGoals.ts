import { WordCount } from '@prisma/client'
import { WordsCounterEntitie } from 'src/entities/WordsCounter/WordsCounterEntitie'
import { throwWordsCounterMessages } from 'src/entities/WordsCounter/utils'
import { IWordCounterRepository } from 'src/repositories/WordCounterRepository'

export type TUpdateWordGoalsServiceRequest = {
  actions: Pick<IWordCounterRepository, 'updateWordGoals' | 'getCounterByEmail'>
  email: string
  wordGoals: number
}

type TUpdateWordGoalsServiceResponse = WordCount

export const UpdateWordGoalsService = async ({
  actions,
  wordGoals,
  email,
}: TUpdateWordGoalsServiceRequest): Promise<TUpdateWordGoalsServiceResponse> => {
  const { getCounterByEmail, updateWordGoals } = actions

  const existingWordCounter = await getCounterByEmail(email)

  if (!existingWordCounter)
    throw new Error(throwWordsCounterMessages.wordCounterNotFount)

  const { updateWordGoals: updateGoal } = WordsCounterEntitie(
    existingWordCounter,
    email,
  )

  const updatedWordGoal = await updateGoal(wordGoals)

  await updateWordGoals(email, wordGoals)

  return updatedWordGoal
}
