import { IPatchActiveBookServiceRequest, PatchActiveBookService } from '.'
import { inMemoryBooksRepository } from '@repositories'
import { CreateBookService, TCreateBookServiceRequest } from '../create'
import { throwBookMessages } from '@utils'
import { bookEntitieMock } from '~/src/shared/mocks'

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
      authorId: bookEntitieMock.userId
    })

    const sut = await PatchActiveBookService({
      action,
      bookId: newBook.id
    })

    expect(sut.isActive).toEqual(!newBook.isActive)
  })
})
