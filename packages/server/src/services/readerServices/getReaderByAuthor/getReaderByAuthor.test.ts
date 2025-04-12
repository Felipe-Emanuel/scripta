import { inMemoryReaderRepository } from '@repositories'
import { GetReaderByAuthorService, TGetReaderByAuthorRequest } from '.'
import { throwReaderMessages } from '@utils'
import { CreateReaderService, TCreateReaderRequest } from '../create'
import { bookEntitieMock, mockReader, userEntitieMock } from '~/src/shared/mocks'

describe('GetReaderByAuthorService', () => {
  const { getAllReadersByAuthor, createReader } = inMemoryReaderRepository()

  const action: TGetReaderByAuthorRequest['action'] = {
    getAllReadersByAuthor
  }

  const createReaderAction: TCreateReaderRequest['action'] = {
    createReader
  }

  it('should throw exception about ausent invalidEmail', async () => {
    const sut = GetReaderByAuthorService({
      action,
      userId: undefined
    })

    expect(sut).rejects.toThrow(throwReaderMessages.invalidUser)
  })

  const { longitude, latitude } = mockReader

  it('should be able to return a existent reader list', async () => {
    CreateReaderService({
      action: createReaderAction,
      authorId: userEntitieMock.id,
      body: {
        bookId: bookEntitieMock.id,
        location: {
          longitude,
          latitude
        }
      },
      reader: userEntitieMock
    })

    const sut = await GetReaderByAuthorService({
      action,
      userId: userEntitieMock.id
    })

    expect(sut).toHaveLength(1)
  })
})
