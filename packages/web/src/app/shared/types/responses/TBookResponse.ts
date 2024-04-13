import { TReaction, TCharacterResponse } from '@shared/types'

export type TBookResponse = {
  id: string
  title: string
  description: string
  publishedUrl: string
  userId: string
  heroPathUrl: string
  conclued: boolean
  createdAt: Date
  updatedAt: Date
  Gender: string
  Theme: string
  hits: number
  characters: TCharacterResponse[]
  reaction: TReaction[]
  totalWords: number
  isActive: boolean
}
