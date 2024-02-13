import { api } from '@shared/services/axios/api'
import { TAuthRequest, TCreateUserRequest, TUser } from '@shared/types'
import { AxiosError } from 'axios'

export const auth = async ({
  email,
  password,
}: TAuthRequest): Promise<TUser | undefined> => {
  try {
    const endpoint = '/auth'

    const body = {
      email,
      password,
    }

    const { data } = await api.post<TUser>(endpoint, body)

    return data
  } catch (err) {
    if (err instanceof AxiosError) {
      throw new Error(err.message)
    }
  }
}

export const createUser = async ({
  email,
  name,
  password,
}: TCreateUserRequest): Promise<TUser | undefined> => {
  try {
    const endpoint = '/users'

    const body = {
      email,
      name,
      password,
    }

    const { data } = await api.post<TUser>(endpoint, body)

    return data
  } catch (err) {
    if (err instanceof AxiosError) {
      throw new Error(err.message)
    }
  }
}
