import { inMemoryUserRepository } from '@repositories'
import { GetByUserIdService, TGetByUserIdServiceRequest } from '@services'
import { throwUserMessages } from '@utils'
import { userEntitieMock } from '~/src/shared/mocks'

describe('GetByUserIdService', () => {
  const { getByUserId, createUser } = inMemoryUserRepository()

  const action: TGetByUserIdServiceRequest['action'] = {
    getByUserId
  }

  beforeEach(async () => {
    await createUser(userEntitieMock)
  })

  it('should throw if userid is not provided', async () => {
    const sut = GetByUserIdService({
      userid: '',
      action
    })

    await expect(sut).rejects.toThrow(throwUserMessages.userNotFound)
  })

  it('should throw if user does not exist', async () => {
    const sut = GetByUserIdService({
      userid: 'non-existent-id',
      action
    })

    await expect(sut).rejects.toThrow(throwUserMessages.userNotFound)
  })

  it('should return the user if id exists', async () => {
    const sut = await GetByUserIdService({
      userid: userEntitieMock.id,
      action
    })

    expect(sut).toBeDefined()
    expect(sut.id).toBe(userEntitieMock.id)
    expect(sut.email).toBe(userEntitieMock.email)
    expect(sut.name).toBe(userEntitieMock.name)
  })
})
