import { inMemoryUserRepository } from '@repositories'
import { CheckUserIsValidService, TCheckUserIsValidServiceRequest } from '@services'
import { userEntitieMock } from '~/src/shared/mocks'

describe('CheckUserIsValidService', () => {
  const { getUserByEmail, createUser } = inMemoryUserRepository()

  const action: TCheckUserIsValidServiceRequest['action'] = {
    getUserByEmail
  }

  beforeEach(async () => {
    await createUser(userEntitieMock)
  })

  it('should return false if user does not exist', async () => {
    const sut = await CheckUserIsValidService({
      action,
      email: 'inexistente@email.com'
    })

    expect(sut).toBe(false)
  })

  it('should return false if user id is different', async () => {
    const sut = await CheckUserIsValidService({
      action,
      email: userEntitieMock.email,
      id: 'wrong-id'
    })

    expect(sut).toBe(false)
  })

  it('should return formatted user if exists and id matches', async () => {
    const sut = await CheckUserIsValidService({
      action,
      email: userEntitieMock.email,
      id: userEntitieMock.id
    })

    expect(sut).toEqual({
      name: userEntitieMock.name,
      picture: userEntitieMock.picture
    })
  })

  it('should return formatted user even if no id is passed (just exists)', async () => {
    const sut = await CheckUserIsValidService({
      action,
      email: userEntitieMock.email
    })

    expect(sut).toEqual({
      name: userEntitieMock.name,
      picture: userEntitieMock.picture
    })
  })
})
