import { TProvider } from '@shared/types/TProvider'

export type TSessionCustomer = {
  name: string
  image: string
  email: string
  accessToken: string
  createdAt: string
  expirationTime: Date
  id: string
  picture: string
  rule: string
  updatedAt: Date
  provider?: TProvider
}
