import { throwUserMessages } from 'src/entities/User/utils'
import { inMemoryUserRepository } from 'src/repositories/inMemory/inMemoryUserRepository'
import { CreateUserService } from 'src/services/userServices/create'
import { userMock, body } from 'src/services/userServices/mock'
import { PatchUserService } from 'src/services/userServices/patch'

describe('PatchUserService', () => {
  it('should be able to patch user picture ', async () => {
    const { createUser, getUserByEmail, patchUserPicture } =
      inMemoryUserRepository()

    const actions = {
      createUser,
      getUserByEmail,
      patchUserPicture,
    }

    await CreateUserService({
      ...userMock,
      actions,
      hasProvider: false,
    })
    const sut = await PatchUserService(body)

    expect(sut.picture).toEqual(body.picture)
  })

  it('should throw exception about user not found', async () => {
    const sut = PatchUserService({
      picture: body.picture,
      email: 'wrong@example.com',
    })

    expect(sut).rejects.toThrow(throwUserMessages.userNotFound)
  })
})
