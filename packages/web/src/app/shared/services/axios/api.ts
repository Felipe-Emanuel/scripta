import axios, { AxiosError, AxiosInstance } from 'axios'
import { ApiError } from 'next/dist/server/api-utils'
import { parseCookies, destroyCookie } from 'nookies'
import { toast } from 'react-toastify'
import { session } from '@shared/utils/constants/cookies'
import { TSessionCustomer } from '@shared/types'
import { getProviders } from 'next-auth/react'

const baseURL = process.env.NEXT_PUBLIC_BASE_URL

export const api = axios.create({
  baseURL,
})

api.interceptors.request.use(async (config) => {
  const cookies = parseCookies()
  const stringfyiedSessionCustomer = cookies._memorize_
  const sessionCustomer: TSessionCustomer =
    stringfyiedSessionCustomer && JSON.parse(stringfyiedSessionCustomer)

  const provider = await getProviders()

  if (sessionCustomer) {
    config.headers.Authorization = `Bearer ${sessionCustomer?.accessToken}`
    config.headers.provider = provider?.id
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
        console.log(token)
        toast.error('Acesso não autorizado')
        session && destroyCookie(null, session)
        return (window.location.href = '/')
      }

      toast.info(error.response?.data.message)
    }
  },
)

export const FAQApi: AxiosInstance = axios.create({})
