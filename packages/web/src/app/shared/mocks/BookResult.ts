import { TBookResponse } from '@shared/types'
import { randomUUID } from 'crypto'

export const BookResultMock: TBookResponse = {
  characters: [],
  conclued: true,
  createdAt: new Date(),
  updatedAt: new Date(),
  description: 'lorem ipsum',
  Gender: 'Love',
  heroPathUrl: 'data:image/jpeg;base64,/I9v',
  hits: 350,
  id: randomUUID(),
  isActive: true,
  publishedUrl: 'https://link-to-published.com',
  reaction: [],
  Theme: 'oldschool',
  title: 'A Nice Title',
  totalWords: 35250,
  userId: randomUUID()
}
