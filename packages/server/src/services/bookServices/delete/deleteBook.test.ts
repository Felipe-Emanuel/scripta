import { bookEntitieMock } from '@entities/Book/mocks'
import { throwBookMessages } from '@entities/Book/utils'
import { inMemoryBooksRepository } from '@repositories'
import {
  TDeleteBookServiceRequest,
  DeleteBookService,
  CreateBookService,
  TCreateBookServiceRequest,
} from '@services'

describe('DeleteBookService', () => {
  const { createBook, deleteBook, getAllBooks } = inMemoryBooksRepository()

  const deleteBookAction: TDeleteBookServiceRequest['action'] = {
    deleteBook,
  }

  const createBookAction: TCreateBookServiceRequest['actions'] = {
    createBook,
    getAllBooks,
  }

  it('should throw exception about book ID missing', async () => {
    const sut = DeleteBookService({
      action: deleteBookAction,
      bookId: '',
    })

    expect(sut).rejects.toThrow(throwBookMessages.missingBookId)
  })

  it('should delete book', async () => {
    const newBook = await CreateBookService({
      actions: createBookAction,
      book: bookEntitieMock,
      userEmail: bookEntitieMock.userEmail,
    })

    const sut = await DeleteBookService({
      action: deleteBookAction,
      bookId: newBook.id,
    })

    expect(sut).toEqual(newBook)
  })
})
