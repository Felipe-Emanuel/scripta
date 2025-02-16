import { api } from '@shared/services/axios/api'
import { TGoalResponse, TCreateGoalRequest, TGetGoalProgressResponse } from '@shared/types'

export const createNewGoal = async ({ email, goals }: TCreateGoalRequest) => {
  try {
    const endpoint = '/goals'

    const body: TCreateGoalRequest = {
      email,
      goals
    }

    const { data } = await api.post<TGoalResponse[]>(endpoint, body)

    if (data) {
      return data[0]
    }
  } catch (err) {
    if (err instanceof Error) throw new Error('Falha ao registrar uma nova meta do dia', err)
  }
}

export const getGoalProgress = async (userEmail: string) => {
  try {
    const endpoint = `/getGoalProgress/${userEmail}`

    const { data } = await api.get<TGetGoalProgressResponse>(endpoint)

    return data
  } catch (err) {
    if (err instanceof Error) throw new Error('Falha ao registrar uma nova meta do dia', err)
  }
}
