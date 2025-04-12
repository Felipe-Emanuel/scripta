import { inMemoryBooksRepository } from '@repositories'
import {
  TDeleteBookServiceRequest,
  DeleteBookService,
  CreateBookService,
  TCreateBookServiceRequest
} from '@services'
import { throwBookMessages } from '@utils'
import { bookEntitieMock } from '~/src/shared/mocks'

describe('DeleteBookService', () => {
  const { createBook, deleteBook, getAllBooks } = inMemoryBooksRepository()

  const deleteBookAction: TDeleteBookServiceRequest['action'] = {
    deleteBook
  }

  const createBookAction: TCreateBookServiceRequest['actions'] = {
    createBook,
    getAllBooks
  }

  it('should throw exception about book ID missing', async () => {
    const sut = DeleteBookService({
      action: deleteBookAction,
      bookId: ''
    })

    expect(sut).rejects.toThrow(throwBookMessages.missingBookId)
  })

  it('should delete book', async () => {
    const newBook = await CreateBookService({
      actions: createBookAction,
      book: bookEntitieMock,
      authorId: bookEntitieMock.userId
    })

    const sut = await DeleteBookService({
      action: deleteBookAction,
      bookId: newBook.id
    })

    expect(sut.title).toEqual(newBook.title)
  })
})
