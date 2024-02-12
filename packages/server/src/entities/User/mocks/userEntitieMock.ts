import { fakeBase64 } from '@constants/fakeBase64'
import { User } from '@prisma/client'
import { expirationTime } from 'src/services/userServices/create/createUser'

export const userEntitieMock: User = {
  id: '234-sdfsdf-23f-2effdgd',
  email: 'user@prisma.com',
  name: 'John Doe John Doe',
  password: 'A@a12345',
  rule: 'client',
  picture: fakeBase64,
  expirationTime,
  createdAt: new Date(),
  updatedAt: new Date(),
}
