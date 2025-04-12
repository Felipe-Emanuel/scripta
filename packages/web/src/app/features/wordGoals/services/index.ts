import { api } from '@shared/services/axios/api'
import { TGetGoalProgressResponse } from '@shared/types'

export const getGoalProgress = async () => {
  try {
    const endpoint = '/getGoalProgress'

    const { data } = await api.get<TGetGoalProgressResponse>(endpoint)

    return data
  } catch (err) {
    if (err instanceof Error) throw new Error('Falha ao registrar uma nova meta do dia', err)
  }
}
