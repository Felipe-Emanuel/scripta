import { inMemoryUserRepository, inMemoryReaderRepository } from '@repositories'
import { GetReaderByEmailService, TGetReaderByEmailRequest } from '.'
import { throwReaderMessages } from '@entities/Reader/utils'
import { throwUserMessages } from '@entities/User/utils'
import { CreateUserService, TCreateUserServiceRequest } from 'src/services/userServices'
import { mockReader } from '@entities/Reader/mocks'

describe('GetReaderByEmailService', () => {
  const { getReaderFromEmail } = inMemoryReaderRepository()
  const { createUser, getUserByEmail } = inMemoryUserRepository()

  const action: TGetReaderByEmailRequest['action'] = {
    getReaderFromEmail
  }

  const createUserAction: TCreateUserServiceRequest['actions'] = {
    createUser,
    getUserByEmail
  }

  it('should throw about missing reader email', () => {
    const sut = GetReaderByEmailService({
      action,
      readerEmail: ''
    })

    expect(sut).rejects.toThrow(throwReaderMessages.invalidEmail)
  })

  it('should throw about reader not found', () => {
    const sut = GetReaderByEmailService({
      action,
      readerEmail: 'unexpectedEmail'
    })

    expect(sut).rejects.toThrow(throwUserMessages.userNotFound)
  })

  it('should be able to return a existent reader by your email', async () => {
    const existentReader = await CreateUserService({
      actions: createUserAction,
      email: mockReader.userEmail,
      name: mockReader.userName,
      hasProvider: true,
      password: ''
    })

    const sut = await GetReaderByEmailService({
      action,
      readerEmail: existentReader.email
    })

    expect(sut.email).toEqual(existentReader.email)
  })
})
