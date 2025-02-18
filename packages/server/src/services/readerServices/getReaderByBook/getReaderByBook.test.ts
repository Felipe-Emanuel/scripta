import { inMemoryBooksRepository, inMemoryReaderRepository } from '@repositories'
import { GetReaderByBook, TGetReaderByBookRequest } from '.'
import { mockReader } from '@entities/Reader/mocks'
import { throwReaderMessages } from '@entities/Reader/utils'
import { CreateReaderService, TCreateReaderRequest } from '../create'
import { CreateBookService, TCreateBookServiceRequest } from 'src/services/bookServices'
import { bookEntitieMock } from '@entities/Book/mocks'

describe('GetReaderByBook', () => {
  const { getAllReadersByBook, createReader } = inMemoryReaderRepository()
  const { createBook, getAllBooks } = inMemoryBooksRepository()

  const action: TGetReaderByBookRequest['action'] = {
    getAllReadersByBook
  }

  const createReaderAction: TCreateReaderRequest['action'] = {
    createReader
  }

  const createBookActions: TCreateBookServiceRequest['actions'] = {
    createBook,
    getAllBooks
  }

  it('should throw about about invalid book', () => {
    const sut = GetReaderByBook({
      action,
      bookId: '',
      email: mockReader.userEmail
    })

    expect(sut).rejects.toThrow(throwReaderMessages.invalidBook)
  })

  it('should return a empty array', async () => {
    const sut = await GetReaderByBook({
      action,
      bookId: 'unexpectedBookId',
      email: mockReader.userEmail
    })

    expect(sut).toEqual([])
  })

  it('should return a existent list of readers of a book', async () => {
    await CreateBookService({
      actions: createBookActions,
      book: {
        ...bookEntitieMock
      },
      userEmail: bookEntitieMock.userEmail
    })

    const newReader = await CreateReaderService({
      action: createReaderAction,
      userEmail: mockReader.userEmail,
      location: {
        latitude: mockReader.latitude,
        longitude: mockReader.longitude
      },
      ...mockReader
    })

    const sut = await GetReaderByBook({
      action,
      bookId: bookEntitieMock.id,
      email: newReader.userEmail
    })

    expect(sut).toHaveLength(1)
  })
})
