import { bookEntitieMock } from '@entities/Book/mocks'
import { Chapter } from '@prisma/client'
import { randomUUID } from 'crypto'

export const chapterMock: Chapter = {
  id: randomUUID(),
  createdAt: new Date(),
  updatedAt: new Date(),
  bookId: bookEntitieMock.id,
  chapterText: 'this is a mocked book chapter with a minimum of character',
  chapterTitle: 'book chapter title',
  wordsCounter: 150
}
