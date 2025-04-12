import { inMemoryBooksRepository } from '@repositories'
import {
  CreateBookService,
  TCreateBookServiceRequest,
  TUpdateBookServiceRequest,
  UpdateBookService
} from '..'
import { bookEntitieMock } from '~/src/shared/mocks'
import { throwBookMessages } from '@utils'

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
      updatedBook: {
        ...bookEntitieMock
      }
    })

    expect(sut).rejects.toThrow(throwBookMessages.missingBookId)
  })

  it('should update a existent book', async () => {
    const existentBook = await CreateBookService({
      actions: createBookAction,
      book: bookEntitieMock,
      authorId: bookEntitieMock.userId
    })

    const updatedBook = await UpdateBookService({
      action,
      bookId: existentBook.id,
      updatedBook: {
        ...existentBook,
        title: 'updated book'
      }
    })

    expect(updatedBook.title).toBe('updated book')
  })
})
