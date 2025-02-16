import { jestErrorHandler } from '~/__tests__/jestErrorHandler'

import { bookEntitieMock } from '@entities/Book/mocks'
import { throwBookMessages } from '@entities/Book/utils'
import { inMemoryBooksRepository } from '@repositories'
import {
  CreateBookService,
  TCreateBookServiceRequest,
  GetBookByIdService,
  TGetBookByIdServiceRequest
} from '@services'

describe('GetBookByIdService', () => {
  const { getAllBooks, createBook } = inMemoryBooksRepository()

  const createBookActions: TCreateBookServiceRequest['actions'] = {
    createBook,
    getAllBooks
  }

  const action: TGetBookByIdServiceRequest['action'] = {
    getAllBooks
  }

  it('should throw a exception about user email missing', async () => {
    try {
      await GetBookByIdService({
        action,
        paramUserEmail: '',
        paramBookId: bookEntitieMock.id
      })
    } catch (e) {
      jestErrorHandler({
        error: e,
        expected: throwBookMessages.emailMissing
      })
    }
  })

  it('should throw a exception about user bookId missing', async () => {
    try {
      await GetBookByIdService({
        action,
        paramUserEmail: bookEntitieMock.userEmail,
        paramBookId: ''
      })
    } catch (e) {
      jestErrorHandler({
        error: e,
        expected: throwBookMessages.missingBookId
      })
    }
  })

  it('should return a existent list of books', async () => {
    const newBook = await CreateBookService({
      actions: createBookActions,
      book: bookEntitieMock,
      userEmail: bookEntitieMock.userEmail
    })

    const sut = await GetBookByIdService({
      action,
      paramUserEmail: newBook.userEmail,
      paramBookId: newBook.id
    })

    expect(sut.userEmail).toEqual(newBook.userEmail)
  })
})
