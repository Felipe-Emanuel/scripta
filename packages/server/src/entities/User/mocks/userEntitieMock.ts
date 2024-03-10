import { fakeBase64 } from '@constants/fakeBase64'
import { User } from '@prisma/client'
import { expirationTime } from 'src/services/userServices/create'

export const userEntitieMock: User = {
  id: '234-sdfsdf-23f-2effdgd',
  email: 'user@prisma.com',
  name: 'John Doe John Doe',
  password: 'A@a12345',
  rule: 'client',
  picture: fakeBase64,
  accessToken:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJBQDIxMTFhLmNvbSIsImlhdCI6MTcwNzc4Nzc3MSwiZXhwIjoxNzA3NzkxMzcxfQ.sKCOMzclUWkUm5NIAtn6bqo19bZCKPiyld5RBAICTtw',
  expirationTime,
  createdAt: new Date(),
  updatedAt: new Date(),
}
