import { randomUUID } from 'crypto'
import { CreateBookService, TCreateBookServiceRequest } from './CreateBook'

describe('Create Book', () => {
  it('should create a new book', async () => {
    const newBook: TCreateBookServiceRequest = {
      conclued: true,
      description: 'Book description Fake',
      heroPathUrl: 'base64',
      publishedUrl: 'https://linktobook.com',
      title: `Book Title Fake Number ${Math.random() * 100}`,
      userId: '234-sdfsdf-23f-2effdgd',
    }

    const expected = {
      ...newBook,
      id: randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const sut = await CreateBookService(newBook)

    expect(sut.title).toEqual(expected.title)
  })

  it('should not create a new book with a existing title', async () => {
    const bookToBeConflictedWithSameTitle = {
      conclued: true,
      description: 'Book description Fake',
      heroPathUrl: 'base64',
      publishedUrl: 'https://linktobook.com',
      title: `Same Title`,
      userId: '234-sdfsdf-23f-2effdgsdsd',
    }

    const sut = () => CreateBookService(bookToBeConflictedWithSameTitle)

    await sut()

    expect(sut()).rejects.toBeInstanceOf(Error)
  })
})
