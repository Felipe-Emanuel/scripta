import { api } from '@shared/services/axios/api'
import { TAuthRequest, TCreateUserRequest, TUser } from '@shared/types'
import { AxiosError } from 'axios'

export const auth = async ({ email, password }: TAuthRequest): Promise<TUser | undefined> => {
  try {
    const endpoint = '/auth'

    const body = {
      email,
      password
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
  token,
  user
}: TCreateUserRequest): Promise<TUser | undefined> => {
  try {
    const endpoint = '/users'

    let body = {}

    if (token) {
      body = {
        token
      }
    }

    if (user) {
      body = {
        user
      }
    }

    if (!user && !token) throw new Error('You must provide a user or a token')

    const { data } = await api.post<TUser>(endpoint, body)

    return data
  } catch (err) {
    if (err instanceof AxiosError) {
      throw new Error(err.message)
    }
  }
}
