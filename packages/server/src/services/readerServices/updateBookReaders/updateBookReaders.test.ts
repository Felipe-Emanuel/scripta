import { inMemoryReaderRepository } from '@repositories'
import { TUpdateBookReadersRequest, UpdateBookReadersService } from '.'
import { mockReader } from '@entities/Reader/mocks'
import { throwReaderMessages } from '@entities/Reader/utils'
import { bookEntitieMock } from '@entities/Book/mocks'

describe('UpdateBookReadersService', () => {
  const { createOnlyBookReader } = inMemoryReaderRepository()

  const action: TUpdateBookReadersRequest['action'] = {
    createOnlyBookReader
  }

  it('should throw exception about invalidBook', () => {
    const sut = UpdateBookReadersService({
      action,
      bookId: '',
      newReader: mockReader
    })

    expect(sut).rejects.toThrow(throwReaderMessages.invalidBook)
  })

  it('Should return correctly a updated list of readers from a specific book', async () => {
    const sut = await UpdateBookReadersService({
      action,
      bookId: bookEntitieMock.id,
      newReader: mockReader
    })

    expect(sut).toHaveLength(1)
  })
})
