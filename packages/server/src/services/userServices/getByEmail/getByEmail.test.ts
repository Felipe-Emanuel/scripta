import { throwUserMessages } from '@entities/User/utils'
import { inMemomoryUserRepository } from '@repositories'
import {
  userMock,
  GetUserByEmailService,
  CreateUserService,
  TCreateUserServiceRequest,
} from '@services'

describe('GetUserByEmailService', () => {
  const { createUser, getUserByEmail } = inMemomoryUserRepository()

  it('should be able to return an exists user by ID', async () => {
    const actions: TCreateUserServiceRequest['actions'] = {
      createUser,
      getUserByEmail,
    }

    await CreateUserService({
      actions,
      hasProvider: false,
      ...userMock,
    })

    const sut = await GetUserByEmailService({
      email: userMock.email,
      action: {
        getUserByEmail,
      },
    })

    expect(sut.email).toEqual(userMock.email)
  })

  it('should throw exception about unexistent ID', async () => {
    const sut = GetUserByEmailService({
      email: '',
      action: {
        getUserByEmail,
      },
    })

    expect(sut).rejects.toThrow(throwUserMessages.wrongEmailOrPassword)
  })

  it('should throw exception about user not found', async () => {
    const sut = GetUserByEmailService({
      email: 'invalidEmail@test.com',
      action: {
        getUserByEmail,
      },
    })

    expect(sut).rejects.toThrow(throwUserMessages.userNotFound)
  })
})
