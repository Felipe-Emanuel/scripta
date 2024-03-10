import { api } from '@shared/services/axios/api'
import { defaultErrorMessages } from '@shared/utils/constants/defaultErrorMessages'
import { AxiosError } from 'axios'
import { Dispatch, SetStateAction } from 'react'
import {
  TGetGoalRequest,
  TGoalResponse,
  TUpdateCurrentGoalRequest,
} from '@shared/types'

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

export const getGoalByFilter = async (
  email: string,
  resolver: Dispatch<SetStateAction<boolean>>,
) => {
  try {
    const endpoint = '/getGoals'

    const body: TGetGoalRequest = {
      email,
      startGoalFilter: new Date().toISOString(),
      endGoalFilter: new Date().toISOString(),
    }

    const { data } = await api.post<TGoalResponse[]>(endpoint, body)

    if (data) {
      resolver(true)
      return data[0]
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      error.message === defaultErrorMessages.wordCountNotFound &&
        resolver(false)
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
