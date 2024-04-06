import { inMemoryReaderRepository } from '@repositories'
import { CreateReaderService, TCreateReaderRequest } from '.'
import { mockReader } from '@entities/Reader/mocks'
import { throwReaderMessages } from '@entities/Reader/utils'

describe('CreateReaderService', () => {
  const { createReader } = inMemoryReaderRepository()

  const action: TCreateReaderRequest['action'] = {
    createReader
  }

  const { longitude, latitude, userEmail } = mockReader

  it('should throw about missing email', () => {
    const sut = CreateReaderService({
      action,
      userEmail: '',
      location: {
        longitude,
        latitude
      },
      authorEmail: mockReader.authorEmail,
      picture: mockReader.picture,
      portfolioUrl: mockReader.portfolioUrl,
      userName: mockReader.userName
    })

    expect(sut).rejects.toThrow(throwReaderMessages.invalidUser)
  })

  it('should be able to return a created reader', async () => {
    const sut = await CreateReaderService({
      action,
      userEmail,
      location: {
        longitude,
        latitude
      },
      ...mockReader
    })

    expect(sut.latitude).toBe(mockReader.latitude)
  })
})
