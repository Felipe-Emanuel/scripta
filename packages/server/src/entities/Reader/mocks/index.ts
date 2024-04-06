import { Reader } from '@prisma/client'
import { randomUUID } from 'crypto'

export const mockReader: Reader = {
  id: randomUUID(),
  userEmail: 'foo@app.com',
  authorEmail: 'author@app.com',
  createdAt: new Date(),
  updatedAt: new Date(),
  latitude: -19.173424746344487,
  longitude: -41.473031929006765,
  picture: '',
  portfolioUrl: 'https://link-to-portolio.com',
  userName: 'John Doe Doe Doe'
}
