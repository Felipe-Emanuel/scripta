import { bookEntitieMock } from '@entities/Book/mocks'
import { IPatchConcluedBookServiceRequest, PatchConcluedBookService } from '.'
import { throwBookMessages } from '@entities/Book/utils'
import { inMemoryBooksRepository } from '@repositories'
import { CreateBookService, TCreateBookServiceRequest } from '../create'

describe('PatchConcluedBookService', () => {
  const { toggleConcluedBook, createBook, getAllBooks } = inMemoryBooksRepository()

  const action: IPatchConcluedBookServiceRequest['action'] = {
    toggleConcluedBook
  }

  const createBookAction: TCreateBookServiceRequest['actions'] = {
    createBook,
    getAllBooks
  }

  it('should should throw about missing book id', () => {
    const sut = PatchConcluedBookService({
      action,
      bookId: ''
    })

    expect(sut).rejects.toThrow(throwBookMessages.missingBookId)
  })

  it('should update a conclued book state', async () => {
    const newBook = await CreateBookService({
      actions: createBookAction,
      book: bookEntitieMock,
      userEmail: bookEntitieMock.userEmail
    })

    const sut = await PatchConcluedBookService({
      action,
      bookId: newBook.id
    })

    expect(sut.conclued).toEqual(!newBook.conclued)
  })
})
