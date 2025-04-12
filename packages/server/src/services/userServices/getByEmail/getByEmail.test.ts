import { inMemoryUserRepository } from '@repositories'
import { GetUserByEmailService, TGetByEmailRequest } from '@services'
import { throwUserMessages } from '@utils'
import { userEntitieMock } from '~/src/shared/mocks'

describe('GetUserByEmailService', () => {
  const { getUserByEmail, createUser } = inMemoryUserRepository()

  const baseAction: TGetByEmailRequest['action'] = {
    getUserByEmail
  }

  beforeEach(async () => {
    await createUser(userEntitieMock)
  })

  it('should throw if email is not provided', async () => {
    const sut = GetUserByEmailService({
      email: '',
      action: baseAction
    })

    await expect(sut).rejects.toThrow(throwUserMessages.wrongEmailOrPassword)
  })

  it('should throw if user does not exist', async () => {
    const sut = GetUserByEmailService({
      email: 'notfound@email.com',
      action: baseAction
    })

    await expect(sut).rejects.toThrow(throwUserMessages.userNotFound)
  })

  it('should return the user if found', async () => {
    const sut = await GetUserByEmailService({
      email: userEntitieMock.email,
      action: baseAction
    })

    expect(sut).toBeDefined()
    expect(sut.email).toBe(userEntitieMock.email)
    expect(sut.name).toBe(userEntitieMock.name)
  })

  it('should support optional includeBook and includeReaders', async () => {
    const sut = await GetUserByEmailService({
      email: userEntitieMock.email,
      action: baseAction,
      includeBook: true,
      includeReaders: true
    })

    expect(sut).toHaveProperty('email', userEntitieMock.email)
  })
})
