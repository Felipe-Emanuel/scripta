import { fakeBase64 } from '@constants/fakeBase64'
import { User } from '@prisma/client'

export const userEntitieMock: User = {
  id: '234-sdfsdf-23f-2effdgd',
  email: 'user@prisma.com',
  name: 'John Doe John Doe',
  password: 'A@a12345',
  rule: 'client',
  picture: fakeBase64,
  createdAt: new Date(),
  updatedAt: new Date(),
  feedbackId: ''
}
