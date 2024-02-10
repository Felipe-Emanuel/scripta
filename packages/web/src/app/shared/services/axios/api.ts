import axios, { AxiosError, AxiosInstance } from 'axios'
import { ApiError } from 'next/dist/server/api-utils'
import { parseCookies } from 'nookies'
import { toast } from 'react-toastify'
// import { sessionToken } from '@shared/utils/constants/cookies'
import { TSessionCustomer } from '@shared/types'

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL

export const api = axios.create({
  baseURL,
})

api.interceptors.request.use((config) => {
  const cookies = parseCookies()
  const stringfyiedSessionCustomer = cookies._t
  const sessionCustomer: TSessionCustomer =
    stringfyiedSessionCustomer && JSON.parse(stringfyiedSessionCustomer)

  if (sessionCustomer) {
    config.headers.Authorization = `Bearer ${sessionCustomer?.sesstionToken}`
    config.headers.RefresToken = sessionCustomer?.refreshToken
  }

  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error instanceof AxiosError) {
      toast.info(error.response?.data)

      if (error.code === 'ERR_NETWORK') {
        toast.error('Servidor indisponível ou fora do ar.')
        throw new ApiError(503, 'Servidor indisponível ou fora do ar.')
      }

      if (error.response?.status === 401) {
        toast.error('Acesso não autorizado')
        // destroyCookie(null, sessionToken)
        return (window.location.href = '/')
      }
    }
  },
)

export const FAQApi: AxiosInstance = axios.create({})
