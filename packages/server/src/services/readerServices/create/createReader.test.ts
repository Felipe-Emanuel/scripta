import { inMemoryReaderRepository } from '@repositories'
import { CreateReaderService, TCreateReaderRequest } from '.'
import { throwReaderMessages } from '@utils'
import { bookEntitieMock, mockReader, userEntitieMock } from '~/src/shared/mocks'

describe('CreateReaderService', () => {
  const { createReader } = inMemoryReaderRepository()

  const action: TCreateReaderRequest['action'] = {
    createReader
  }

  const { longitude, latitude } = mockReader

  it('should throw about missing readerId', () => {
    const sut = CreateReaderService({
      action,
      authorId: bookEntitieMock.id,
      body: {
        bookId: bookEntitieMock.id,
        location: {
          latitude,
          longitude
        }
      },
      reader: {
        ...userEntitieMock,
        id: undefined
      }
    })

    expect(sut).rejects.toThrow(throwReaderMessages.invalidUser)
  })

  it('should be able to return a created reader', async () => {
    const sut = await CreateReaderService({
      action,
      authorId: bookEntitieMock.id,
      body: {
        bookId: bookEntitieMock.id,
        location: {
          latitude,
          longitude
        }
      },
      reader: userEntitieMock
    })

    expect(sut.latitude).toBe(mockReader.latitude)
  })
})
