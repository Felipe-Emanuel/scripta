import { inMemoryBooksRepository, inMemoryReaderRepository } from '@repositories'
import { throwReaderMessages } from '@utils'
import { CreateBookService, TCreateBookServiceRequest } from '@services'
import { CreateReaderService, TCreateReaderRequest } from '../create'
import { GetReadersByBook, TGetReadersByBookRequest } from '.'
import { bookEntitieMock, mockReader, userEntitieMock } from '~/src/shared/mocks'

describe('GetReaderByBook', () => {
  const { getAllReadersByBook, createReader } = inMemoryReaderRepository()
  const { createBook, getAllBooks } = inMemoryBooksRepository()

  const action: TGetReadersByBookRequest['action'] = {
    getAllReadersByBook
  }

  const createReaderAction: TCreateReaderRequest['action'] = {
    createReader
  }

  const createBookActions: TCreateBookServiceRequest['actions'] = {
    createBook,
    getAllBooks
  }

  const { longitude, latitude } = mockReader

  it('should throw about about invalid book', () => {
    const sut = GetReadersByBook({
      action,
      bookId: undefined,
      authorId: userEntitieMock.id
    })

    expect(sut).rejects.toThrow(throwReaderMessages.invalidBook)
  })

  it('should throw about about invalid author', () => {
    const sut = GetReadersByBook({
      action,
      bookId: bookEntitieMock.id,
      authorId: undefined
    })

    expect(sut).rejects.toThrow(throwReaderMessages.invalidUser)
  })

  it('should return a empty array', async () => {
    const sut = await GetReadersByBook({
      action,
      bookId: 'inexistent book id',
      authorId: userEntitieMock.id
    })

    expect(sut).toEqual([])
  })

  it('should return a existent list of readers of a book', async () => {
    await CreateBookService({
      actions: createBookActions,
      book: bookEntitieMock,
      authorId: bookEntitieMock.userId
    })

    await CreateReaderService({
      action: createReaderAction,
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

    const sut = await GetReadersByBook({
      action,
      bookId: bookEntitieMock.id,
      authorId: bookEntitieMock.userId
    })

    expect(sut).toHaveLength(1)
  })
})
