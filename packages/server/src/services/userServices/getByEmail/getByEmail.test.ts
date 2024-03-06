import { throwUserMessages } from 'src/entities/User/utils'
import { inMemomoryUserRepository } from 'src/repositories/inMemory/inMemoryUserRepository'
import {
  CreateUserService,
  TCreateUserServiceRequest,
} from 'src/services/userServices/create/createUser'
import { GetByEmailService } from 'src/services/userServices/getByEmail/getByEmail'
import { userMock } from 'src/services/userServices/mock'

describe('GetByEmailService', () => {
  const { createUser, getUserByEmail } = inMemomoryUserRepository()

  it('should be able to return an exists user by ID', async () => {
    const actions: TCreateUserServiceRequest['actions'] = {
      createUser,
      getUserByEmail,
    }

    await CreateUserService({
      ...userMock,
      actions,
    })

    const sut = await GetByEmailService({
      email: userMock.email,
      action: {
        getUserByEmail,
      },
    })

    expect(sut.email).toEqual(userMock.email)
  })

  it('should throw exception about unexistent ID', async () => {
    const sut = GetByEmailService({
      email: '',
      action: {
        getUserByEmail,
      },
    })

    expect(sut).rejects.toThrow(throwUserMessages.wrongEmailOrPassword)
  })

  it('should throw exception about user not found', async () => {
    const sut = GetByEmailService({
      email: 'invalidEmail@test.com',
      action: {
        getUserByEmail,
      },
    })

    expect(sut).rejects.toThrow(throwUserMessages.userNotFound)
  })
})
