import { inMemoryUserRepository } from '@repositories'
import { CreateUserService, TCreateUserServiceRequest, expirationTime } from '@services'
import { userEntitieMock } from '~/src/shared/mocks'

describe('CreateUserService', () => {
  const { createUser, getUserByEmail } = inMemoryUserRepository()

  const actions: TCreateUserServiceRequest['actions'] = {
    createUser
  }

  const baseUser = {
    id: userEntitieMock.id,
    email: userEntitieMock.email,
    name: userEntitieMock.name,
    password: userEntitieMock.password,
    picture: userEntitieMock.picture
  }

  it('should create a user and return expected fields with generated access token', async () => {
    const sut = await CreateUserService({
      actions,
      newUser: baseUser
    })

    expect(sut).toEqual({
      accessToken: expect.any(String),
      expirationTime: expirationTime.toISOString(),
      name: baseUser.name,
      picture: baseUser.picture
    })

    const created = await getUserByEmail(baseUser.email)
    expect(created).toBeDefined()
    expect(created?.name).toBe(baseUser.name)
  })

  it('should use the provided accessToken if one is passed', async () => {
    const customToken = 'custom.token.string'

    const sut = await CreateUserService({
      actions,
      newUser: {
        ...baseUser,
        email: 'token@email.com',
        accessToken: customToken
      }
    })

    expect(sut.accessToken).toBe(customToken)
  })

  it('should accept user creation without picture or id', async () => {
    const sut = await CreateUserService({
      actions,
      newUser: {
        email: 'nopicture@email.com',
        name: 'No Pic',
        password: 'test-password'
      }
    })

    expect(sut.name).toBe('No Pic')
    expect(sut.picture).toBeUndefined()
    expect(sut.accessToken).toBeDefined()
  })
})
