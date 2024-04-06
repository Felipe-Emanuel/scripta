import { api } from '@shared/services/axios/api'
import { TGetGoalRequest, TGoalResponse } from '@shared/types'
import { defaultErrorMessages } from '@shared/utils/constants/defaultErrorMessages'
import { AxiosError } from 'axios'

export const getGoalByFilter = async ({
  email,
  endGoalFilter,
  startGoalFilter,
}: TGetGoalRequest) => {
  try {
    const endpoint = '/getGoals'

    const body: TGetGoalRequest = {
      email,
      startGoalFilter,
      endGoalFilter,
    }

    const { data } = await api.post<TGoalResponse[]>(endpoint, body)

    if (data) {
      return data
    }

    return []
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(defaultErrorMessages.wordCountNotFound)
    }
  }
}
