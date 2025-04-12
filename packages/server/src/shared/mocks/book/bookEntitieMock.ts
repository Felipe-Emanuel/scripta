import { fakeBase64 } from '@constants/fakeBase64'
import { Book } from '@prisma/client'
import { randomUUID } from 'crypto'
import { userEntitieMock } from '../user'

export const bookEntitieMock: Book = {
  id: randomUUID(),
  userId: userEntitieMock.id,
  createdAt: new Date(),
  updatedAt: new Date(),
  title: 'Book Title Fake',
  description: 'Book description Fake',
  Gender: 'Horror',
  Theme: 'Love',
  socialLink: 'https://linktobook.com',
  conclued: true,
  heroPathUrl: fakeBase64,
  hits: 50,
  totalWords: 65500,
  isActive: true
}
