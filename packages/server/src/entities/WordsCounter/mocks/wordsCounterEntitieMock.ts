import { TWordCounter } from '@types'
import { randomUUID } from 'crypto'

export const wordsCounterEntitieMock: TWordCounter = {
  id: '234-sdfsdf-23f-2effdgd',
  wordCount: [
    {
      createdAt: new Date(),
      updatedAt: new Date(),
      email: 'user@prisma.com',
      id: randomUUID(),
      words: 3500,
      wordsCounterId: '234-sdfsdf-23f-2effdgd',
    },
  ],
}
