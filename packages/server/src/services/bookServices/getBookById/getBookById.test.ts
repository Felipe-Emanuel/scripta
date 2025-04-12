import { inMemoryBooksRepository } from '@repositories'
import {
  CreateBookService,
  TCreateBookServiceRequest,
  GetBookByIdService,
  TGetBookByIdServiceRequest
} from '@services'
import { bookEntitieMock } from '~/src/shared/mocks'

describe('GetBookByIdService', () => {
  const { getAllBooks, createBook, getBookById } = inMemoryBooksRepository()

  const createBookActions: TCreateBookServiceRequest['actions'] = {
    createBook,
    getAllBooks
  }

  const action: TGetBookByIdServiceRequest['action'] = {
    getBookById
  }

  it('should return a existent list of books', async () => {
    const newBook = await CreateBookService({
      actions: createBookActions,
      book: bookEntitieMock,
      authorId: bookEntitieMock.userId
    })

    const sut = await GetBookByIdService({
      action,
      bookId: newBook.id,
      shouldReturnAuthorId: true
    })

    expect(sut.id).toEqual(newBook.id)
  })
})
