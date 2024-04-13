import { fakeBase64 } from '@constants/fakeBase64'
import { Book } from '@prisma/client'
import { randomUUID } from 'crypto'

export const bookEntitieMock: Book = {
  id: randomUUID(),
  userEmail: 'foo@example.com',
  createdAt: new Date(),
  updatedAt: new Date(),
  title: 'Book Title Fake',
  description: 'Book description Fake',
  Gender: 'Horror',
  Theme: 'Love',
  publishedUrl: 'https://linktobook.com',
  conclued: true,
  heroPathUrl: fakeBase64,
  hits: 50,
  totalWords: 65500,
  isActive: true
}
