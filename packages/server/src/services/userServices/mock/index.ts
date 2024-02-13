import { fakeBase64 } from '@constants/fakeBase64'
import { User } from '@prisma/client'
import { randomUUID } from 'crypto'
import { expirationTime } from 'src/services/userServices/create/createUser'
import { TPatchUserRequest } from 'src/services/userServices/patch/patchUser'

export const body: TPatchUserRequest = {
  email: 'test@example.com',
  picture: fakeBase64,
}

export const userMock: User = {
  ...body,
  id: randomUUID(),
  picture: '',
  name: 'John Doe John Doe',
  password: 'A@a12345',
  rule: 'client',
  createdAt: new Date(),
  updatedAt: new Date(),
  accessToken:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJBQDIxMTFhLmNvbSIsImlhdCI6MTcwNzc4Nzc3MSwiZXhwIjoxNzA3NzkxMzcxfQ.sKCOMzclUWkUm5NIAtn6bqo19bZCKPiyld5RBAICTtw',
  expirationTime,
}
