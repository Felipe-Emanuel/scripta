import { inMemoryBooksRepository } from '@repositories'
import { CreateBookService, TCreateBookServiceRequest } from 'src/services/bookServices/create'
import {
  GetAllBooksService,
  TGetAllBooksServiceRequest
} from 'src/services/bookServices/getAllBooks'
import { bookEntitieMock } from '~/src/shared/mocks'
import { throwBookMessages } from '@utils'

describe('GetAllBooksService', () => {
  const { getAllBooks, createBook } = inMemoryBooksRepository()

  const createBookActions: TCreateBookServiceRequest['actions'] = {
    createBook,
    getAllBooks
  }

  const action: TGetAllBooksServiceRequest['action'] = {
    getAllBooks
  }

  it('should throw a exception about user id missing', () => {
    const sut = GetAllBooksService({
      action,
      userid: '',
      onlyFirstChapter: false
    })

    expect(sut).rejects.toThrow(throwBookMessages.missingAuthor)
  })

  it('should return a existent list of books', async () => {
    const newBook = await CreateBookService({
      actions: createBookActions,
      book: bookEntitieMock,
      authorId: bookEntitieMock.userId
    })

    const sut = await GetAllBooksService({
      action,
      userid: bookEntitieMock.userId,
      onlyFirstChapter: true
    })

    expect(sut[0].title).toEqual(newBook.title)
  })
})
