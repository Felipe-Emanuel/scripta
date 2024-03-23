import { bookEntitieMock } from '@entities/Book/mocks'
import { throwBookMessages } from '@entities/Book/utils'
import { inMemoryBooksRepository } from '@repositories'
import {
  CreateBookService,
  TCreateBookServiceRequest,
} from 'src/services/bookServices/create'
import {
  GetAllBooksService,
  TGetAllBooksServiceRequest,
} from 'src/services/bookServices/getAllBooks'

describe('GetAllBooksService', () => {
  const { getAllBooks, createBook } = inMemoryBooksRepository()

  const createBookActions: TCreateBookServiceRequest['actions'] = {
    createBook,
    getAllBooks,
  }

  const action: TGetAllBooksServiceRequest['action'] = {
    getAllBooks,
  }

  it('should throw a exception about user id missing', () => {
    const sut = GetAllBooksService({
      action,
      userEmail: '',
    })

    expect(sut).rejects.toThrow(throwBookMessages.emailMissing)
  })

  it('should return a existent list of books', async () => {
    const newBook = await CreateBookService({
      actions: createBookActions,
      book: bookEntitieMock,
      userEmail: bookEntitieMock.userEmail,
    })

    const sut = await GetAllBooksService({
      action,
      userEmail: bookEntitieMock.userEmail,
    })

    expect(sut[0].userEmail).toEqual(newBook.userEmail)
  })
})
