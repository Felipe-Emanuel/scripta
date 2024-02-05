import { Book } from '@prisma/client'
import { randomUUID } from 'crypto'

export const bookEntitieMock: Book = {
  conclued: true,
  createdAt: new Date(),
  description: 'Book description Fake',
  heroPathUrl: 'OGyClxpf/dddCn6S8yobkg==',
  id: randomUUID(),
  publishedUrl: 'https://linktobook.com',
  title: 'Book Title Fake',
  updatedAt: new Date(),
  userId: randomUUID(),
}
