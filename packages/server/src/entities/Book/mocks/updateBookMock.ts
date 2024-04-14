import { randomUUID } from 'crypto'
import { TUpdateBook } from 'src/shared/types/TUpdateBook'
import { fakeBase64 } from '@constants/fakeBase64'

export const updateBookMock: TUpdateBook = {
  conclued: false,
  isActive: false,
  description: 'description',
  heroPathUrl: fakeBase64,
  publishedUrl: 'https://link',
  id: randomUUID(),
  title: 'title'
}
