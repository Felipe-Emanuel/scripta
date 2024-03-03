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

    console.log(data)

    resolver(true)
    return data.wordCount[0]
  } catch (error) {
    if (error instanceof AxiosError) {
      error.message === defaultErrorMessages.wordCountNotFound &&
        resolver(false)
    }
  }
}

export const postWordCounter = async ({
  email,
  words,
  wordCounterId,
}: TCreateWordCountRequest) => {
  const endpoint = '/wordCount'

  const body: TCreateWordCountRequest = {
    wordCounterId,
    email,
    words,
  }

  const { data } = await api.post<TWordCountResponse>(endpoint, body)

  if (data) {
    return data.wordCount?.[0]
  }
}
