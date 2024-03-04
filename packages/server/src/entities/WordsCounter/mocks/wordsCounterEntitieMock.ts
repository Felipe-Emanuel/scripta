import { TWordCounter } from '@types'
import { randomUUID } from 'crypto'

export const wordsCounterEntitieMock: TWordCounter = {
  id: '234-sdfsdf-23f-2effdgd',
  email: 'foo@example.com',
  wordCount: [
    {
      id: randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
      wordGoals: 4000,
      words: 3500,
      email: 'user@prisma.com',
      wordsCounterId: '234-sdfsdf-23f-2effdgd',
    },
  ],
}
