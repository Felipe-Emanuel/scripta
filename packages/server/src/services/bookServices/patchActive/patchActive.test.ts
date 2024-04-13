import { bookEntitieMock } from '@entities/Book/mocks'
import { IPatchActiveBookServiceRequest, PatchActiveBookService } from '.'
import { throwBookMessages } from '@entities/Book/utils'
import { inMemoryBooksRepository } from '@repositories'
import { CreateBookService, TCreateBookServiceRequest } from '../create'

describe('PatchActiveBookService', () => {
  const { toggleIsActiveBook, createBook, getAllBooks } = inMemoryBooksRepository()

  const action: IPatchActiveBookServiceRequest['action'] = {
    toggleIsActiveBook
  }

  const createBookAction: TCreateBookServiceRequest['actions'] = {
    createBook,
    getAllBooks
  }

  it('should should throw about missing book id', () => {
    const sut = PatchActiveBookService({
      action,
      bookId: ''
    })

    expect(sut).rejects.toThrow(throwBookMessages.missingBookId)
  })

  it('should update a active book state', async () => {
    const newBook = await CreateBookService({
      actions: createBookAction,
      book: bookEntitieMock,
      userEmail: bookEntitieMock.userEmail
    })

    const sut = await PatchActiveBookService({
      action,
      bookId: newBook.id
    })

    expect(sut.isActive).toEqual(!newBook.isActive)
  })
})
