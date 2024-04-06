import { TSessionCustomer } from '@shared/types'
import { parseCookies } from 'nookies'

export const useUser = () => {
  const cookies = parseCookies()
  const stringfyiedSessionCustomer = cookies._memorize_
  const sessionCustomer: TSessionCustomer =
    stringfyiedSessionCustomer && JSON.parse(stringfyiedSessionCustomer)

  return {
    sessionCustomer,
  }
}
