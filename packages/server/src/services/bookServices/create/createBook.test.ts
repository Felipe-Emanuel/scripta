import { randomUUID } from 'crypto'
import { CreateBookService, TCreateBookServiceRequest } from '.'
import { inMemoryBooksRepository } from '@repositories'
import { Book } from '@prisma/client'
import { bookEntitieMock } from '~/src/shared/mocks'

describe('Create Book', () => {
  const { createBook, getAllBooks } = inMemoryBooksRepository()

  const actions: TCreateBookServiceRequest['actions'] = {
    createBook,
    getAllBooks
  }

  it('should create a new book', async () => {
    const newBook: Book = {
      ...bookEntitieMock,
      title: `Book Title Fake Number ${Math.random() * 100}`
    }

    const expected = {
      ...newBook,
      id: randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date()
    }

    const sut = await CreateBookService({
      actions,
      book: newBook,
      authorId: bookEntitieMock.userId
    })

    expect(sut.title).toEqual(expected.title)
  })

  it('should not create a new book with a existing title', async () => {
    const sut = () =>
      CreateBookService({
        actions,
        book: bookEntitieMock,
        authorId: bookEntitieMock.userId
      })

    await sut()

    expect(sut()).rejects.toBeInstanceOf(Error)
  })
})
