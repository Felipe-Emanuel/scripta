import { inMemoryBooksRepository } from '@repositories'
import {
  CreateBookService,
  TCreateBookServiceRequest,
  TUpdateBookServiceRequest,
  UpdateBookService
} from '..'
import { bookEntitieMock } from '@entities/Book/mocks'
import { throwBookMessages } from '@entities/Book/utils'

describe('UpdateBookService', () => {
  const { updateBook, createBook, getAllBooks } = inMemoryBooksRepository()

  const action: TUpdateBookServiceRequest['action'] = {
    updateBook
  }
  const createBookAction: TCreateBookServiceRequest['actions'] = {
    createBook,
    getAllBooks
  }

  it('should throw about missing id', () => {
    const sut = UpdateBookService({
      action,
      bookId: '',
      book: {
        ...bookEntitieMock
      }
    })

    expect(sut).rejects.toThrow(throwBookMessages.missingBookId)
  })

  it('should update a existent book', async () => {
    const existentBook = await CreateBookService({
      actions: createBookAction,
      book: bookEntitieMock,
      userEmail: bookEntitieMock.userEmail
    })

    const updatedBook = await UpdateBookService({
      action,
      bookId: existentBook.id,
      book: {
        ...existentBook,
        title: 'updated book'
      }
    })

    expect(updatedBook.title).toBe('updated book')
  })
})
