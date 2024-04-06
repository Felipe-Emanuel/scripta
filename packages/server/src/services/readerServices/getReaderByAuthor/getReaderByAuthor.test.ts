import { inMemoryReaderRepository } from '@repositories'
import { GetReaderByAuthorService, TGetReaderByAuthorRequest } from '.'
import { throwReaderMessages } from '@entities/Reader/utils'
import { CreateReaderService, TCreateReaderRequest } from '../create'
import { mockReader } from '@entities/Reader/mocks'

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
      authorEmail: ''
    })

    expect(sut).rejects.toThrow(throwReaderMessages.invalidEmail)
  })

  it('should be able to return a existent reader list', async () => {
    const newReader = await CreateReaderService({
      action: createReaderAction,
      userEmail: mockReader.userEmail,
      location: mockReader,
      ...mockReader
    })

    const sut = await GetReaderByAuthorService({
      action,
      authorEmail: newReader.userEmail
    })

    expect(sut).toHaveLength(1)
  })
})
