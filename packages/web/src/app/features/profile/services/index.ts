import { api } from '@shared/services/axios/api'
import { AxiosError } from 'axios'
import { TGoalResponse, TUpdateCurrentGoalRequest } from '@shared/types'

export const getCurrentGoal = async (userEmail: string) => {
  try {
    const endpoint = `/getLastGoal/${userEmail}`

    const { data } = await api.get<TGoalResponse>(endpoint)

    return data
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.message)
    }
  }
}

export const updateCurrentGoal = async (body: TUpdateCurrentGoalRequest) => {
  const endpoint = '/updateGoals'

  const { data } = await api.put<TGoalResponse>(endpoint, body)

  if (data) {
    return data
  }
}
