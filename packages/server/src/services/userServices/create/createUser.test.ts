import { User } from '@prisma/client'
import { randomUUID } from 'crypto'
import { throwUserMessages } from 'src/entities/User/utils'
import { inMemomoryUserRepository } from 'src/repositories/inMemory/inMemoryUserRepository'
import {
  CreateUserService,
  TCreateUserServiceRequest,
  expirationTime,
} from 'src/services/userServices/create'

describe('CreateUser', () => {
  const { createUser, getUserByEmail, patchUserPicture } =
    inMemomoryUserRepository()

  const actions = {
    createUser,
    getUserByEmail,
    patchUserPicture,
  }

  const body: TCreateUserServiceRequest = {
    email: 'body@gmail.com',
    name: 'John Doe John Doe',
    password: 'A@a12345',
    actions,
    hasProvider: false,
  }

  it('should create a new user', async () => {
    const newUser: User = {
      ...body,
      id: randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
      expirationTime,
      picture: '',
      rule: 'client',
      accessToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJBQDIxMTFhLmNvbSIsImlhdCI6MTcwNzc4Nzc3MSwiZXhwIjoxNzA3NzkxMzcxfQ.sKCOMzclUWkUm5NIAtn6bqo19bZCKPiyld5RBAICTtw',
    }
    const sut = await CreateUserService(body)

    expect(sut.name).toEqual(newUser.name)
  })

  it('should throw error by existing user', async () => {
    const sut = CreateUserService(body)

    expect(sut).rejects.toThrow(throwUserMessages.userAlreadyExist)
  })
})
