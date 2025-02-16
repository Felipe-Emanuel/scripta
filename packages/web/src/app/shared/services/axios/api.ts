import axios, { AxiosError, AxiosInstance } from 'axios'
import { ApiError } from 'next/dist/server/api-utils'
import { parseCookies, destroyCookie } from 'nookies'
import { toast } from 'react-toastify'
import { session } from '@shared/utils/constants/cookies'
import { TSessionCustomer } from '@shared/types'

const baseURL = process.env.NEXT_PUBLIC_BASE_URL

export const api: AxiosInstance = axios.create({
  baseURL
})

api.interceptors.request.use(async (config) => {
  const cookies = parseCookies()
  const stringfyiedSessionCustomer = cookies._scripta_
  const sessionCustomer: Pick<TSessionCustomer, 'provider' | 'accessToken'> =
    stringfyiedSessionCustomer && JSON.parse(stringfyiedSessionCustomer)

  if (sessionCustomer?.accessToken) {
    config.headers.Authorization = sessionCustomer?.accessToken
  } else if (sessionCustomer?.provider) {
    config.headers.provider = sessionCustomer.provider
  }

  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error instanceof AxiosError) {
      const originalRequest = error.config
      const token = originalRequest?.headers.Authorization

      if (error.code === 'ERR_NETWORK') {
        toast.error('Servidor indisponível ou fora do ar.')
        throw new ApiError(503, 'Servidor indisponível ou fora do ar.')
      }

      if (error.response?.status === 401 && token) {
        toast.error('Acesso não autorizado')
        session && destroyCookie(null, session)
        return (window.location.href = '/')
      }

      toast.info(error.response?.data.message)
    }
  }
)
