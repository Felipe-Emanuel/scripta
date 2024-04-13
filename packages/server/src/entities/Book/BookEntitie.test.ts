import { BookEntitie } from '.'
import { bookEntitieMock, bookWithCharactersMock, updateBookMock } from './mocks'
import { throwBookMessages } from './utils'

describe('setBook', () => {
  it('should not create a new book entity', async () => {
    const { setBook } = BookEntitie({
      ...bookEntitieMock,
      userEmail: ''
    })

    const sut = setBook()

    expect(sut).rejects.toThrow(throwBookMessages.bookWithoutUserEmail)
  })

  it('should throw a exception about title missing', () => {
    const { setBook } = BookEntitie({
      ...bookEntitieMock,
      title: ''
    })

    const sut = setBook()

    expect(sut).rejects.toThrow(throwBookMessages.bookWithoutTitle)
  })

  it('should throw a exception about description missing', () => {
    const { setBook } = BookEntitie({
      ...bookEntitieMock,
      description: ''
    })

    const sut = setBook()

    expect(sut).rejects.toThrow(throwBookMessages.bookWithoutDescription)
  })

  it('should create a new book entity', async () => {
    const { setBook } = BookEntitie(bookEntitieMock)

    const books = await setBook()

    expect(bookEntitieMock).toEqual(books)
    expect(books.title).toEqual(bookEntitieMock.title)
  })
})

describe('getBookWithCharacters', () => {
  it('should return a book with character', async () => {
    const { getBookWithCharacters } = BookEntitie(bookEntitieMock)

    const sut = await getBookWithCharacters(bookWithCharactersMock)

    expect(bookWithCharactersMock).toEqual(sut)
  })

  it('should not return a book with character', async () => {
    const { getBookWithCharacters } = BookEntitie(bookEntitieMock)

    const sut = getBookWithCharacters({
      book: bookEntitieMock,
      characters: []
    })

    expect(sut).rejects.toThrow(throwBookMessages.bookWithoutCharacters)
  })
})

describe('updatedBook', () => {
  it('should update a book', async () => {
    const { updatedBook } = BookEntitie(bookEntitieMock)

    const sut = await updatedBook(updateBookMock)

    expect(sut).toEqual(updateBookMock)
  })

  it('should return a throw error by required filds', async () => {
    const { updatedBook } = BookEntitie(bookEntitieMock)

    const sut = updatedBook({
      ...updateBookMock,
      title: ''
    })

    expect(sut).rejects.toThrow(throwBookMessages.areAllFieldsFilled)
  })
})

describe('toggleIsActiveBook', () => {
  const { toggleIsActiveBook } = BookEntitie(bookEntitieMock)

  it('should desactive a active book', async () => {
    const sut = await toggleIsActiveBook()

    expect(sut.isActive).toBe(false)
  })

  it('should active a desactive book', async () => {
    const { toggleIsActiveBook } = BookEntitie({
      ...bookEntitieMock,
      isActive: false
    })

    const sut = await toggleIsActiveBook()

    expect(sut.isActive).toBe(true)
  })
})
