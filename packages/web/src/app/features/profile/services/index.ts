import { api } from '@shared/services/axios/api'
import { TCreateWordCountRequest, TWordCountResponse } from '@shared/types'
import { defaultErrorMessages } from '@shared/utils/constants/defaultErrorMessages'
import { AxiosError } from 'axios'
import { Dispatch, SetStateAction } from 'react'

export const getCounters = async (
  email: string,
  resolver: Dispatch<SetStateAction<boolean>>,
) => {
  try {
    const endpoint = `/wordCount/${email}`

    const { data } = await api.get<TWordCountResponse>(endpoint)

    resolver(true)
    return data
  } catch (error) {
    if (error instanceof AxiosError) {
      error.message === defaultErrorMessages.wordCountNotFound &&
        resolver(false)
    }
  }
}

export const createWordCount = async ({
  email,
  words,
}: TCreateWordCountRequest) => {
  const endpoint = '/wordCount'

  const body = {
    email,
    words,
  }

  const { data } = await api.post(endpoint, body)

  return data
}
