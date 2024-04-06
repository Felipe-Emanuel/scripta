import { api } from '@shared/services/axios/api'
import { AxiosError } from 'axios'
import { TGoalResponse, TUpdateCurrentGoalRequest } from '@shared/types'

export const getCurrentGoal = async (email: string) => {
  try {
    const endpoint = '/getLastGoal'

    const body = {
      email,
    }

    const { data } = await api.post<TGoalResponse>(endpoint, body)

    if (data) {
      return data
    }
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
