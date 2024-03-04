import { api } from '@shared/services/axios/api'
import { TWordCount } from '@shared/types'
import { TUpdateWordsGoalRequest } from '@shared/types/requests/TUpdateWordsGoalRequest'

export const updateWordsGoal = async ({
  email,
  wordGoals,
}: TUpdateWordsGoalRequest) => {
  try {
    const endpoint = '/wordCount'

    const body: TUpdateWordsGoalRequest = {
      email,
      wordGoals,
    }

    const { data } = await api.patch<TWordCount>(endpoint, body)

    return data
  } catch (err) {
    if (err instanceof Error)
      throw new Error('Falha na atualização da meta', err)
  }
}
