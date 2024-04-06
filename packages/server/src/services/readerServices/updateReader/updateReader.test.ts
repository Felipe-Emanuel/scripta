import { inMemoryReaderRepository } from '@repositories'
import { TUpdateReaderRequest, UpdateReaderService } from '.'
import { Reader } from '@prisma/client'
import { mockReader } from '@entities/Reader/mocks'
import { CreateReaderService, TCreateReaderRequest } from '../create'

describe('UpdateReaderService', () => {
  const { updateReader, createReader } = inMemoryReaderRepository()

  const action: TUpdateReaderRequest['action'] = {
    updateReader
  }

  const createReaderAction: TCreateReaderRequest['action'] = {
    createReader
  }

  it('should be able to update a existent reader', async () => {
    const newReader: Reader = {
      ...mockReader,
      latitude: -14.258579379120587,
      longitude: -48.76610269943745
    }

    const existentReader = await CreateReaderService({
      action: createReaderAction,
      userEmail: mockReader.userEmail,
      location: {
        latitude: mockReader.latitude,
        longitude: mockReader.longitude
      },
      ...mockReader
    })

    const sut = await UpdateReaderService({
      action,
      email: existentReader.userEmail,
      newReader,
      readerId: existentReader.id
    })

    expect(sut.latitude).not.toEqual(mockReader.latitude)
    expect(sut.latitude).toEqual(newReader.latitude)
  })
})
