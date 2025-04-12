import { Reader } from '@prisma/client'
import { randomUUID } from 'crypto'
import { userEntitieMock } from '../user'

export const mockReader: Reader = {
  id: randomUUID(),
  userId: userEntitieMock.id,
  createdAt: new Date(),
  updatedAt: new Date(),
  latitude: -19.173424746344487,
  longitude: -41.473031929006765,
  picture: '',
  userName: 'John Doe Doe Doe'
}
