import { BookEntitie } from '.'
import { isAllAttributeFilled, isBase64, isLink } from '../../shared/utils'
import {
  bookEntitieMock,
  bookWithCharactersMock,
  updateBookMock,
} from './mocks'
import { throwBookMessages } from './utils'

it('should create a new book entity', async () => {
  const { setBook } = BookEntitie(bookEntitieMock)

  const books = await setBook()

  expect(bookEntitieMock).toEqual(books)
  expect(books.title).toEqual('Book Title Fake')
})

it('should not create a new book entity', async () => {
  const { setBook } = BookEntitie({
    ...bookEntitieMock,
    userId: '',
  })

  const sut = setBook()

  expect(sut).rejects.toThrow(throwBookMessages.bookWithoutUserId)
})

it('should check if required fields are valid', () => {
  expect(bookEntitieMock.userId).not.toBe('')
})

it('should create a book with all fields filled', () => {
  const areAllFieldsFilled = isAllAttributeFilled(bookEntitieMock)

  expect(areAllFieldsFilled).toBeTruthy()
})

it('should valid if publishedUrl is a URL', () => {
  const isValidLink = isLink(bookEntitieMock.publishedUrl)

  expect(isValidLink).toBeTruthy()
})

it('should able to contais a base64 at heroPathUrl', () => {
  const isValidLink = isBase64(bookEntitieMock.heroPathUrl)

  expect(isValidLink).toBeTruthy()
})

it('should return a book with character', async () => {
  const { getBookWithCharacters } = BookEntitie(bookEntitieMock)

  const sut = await getBookWithCharacters(bookWithCharactersMock)

  expect(bookWithCharactersMock).toEqual(sut)
})

it('should not return a book with character', async () => {
  const { getBookWithCharacters } = BookEntitie(bookEntitieMock)

  const sut = getBookWithCharacters({
    book: bookEntitieMock,
    characters: [],
  })

  expect(sut).rejects.toThrow(throwBookMessages.bookWithoutCharacters)
})

it('should update a book', async () => {
  const { updatedBook } = BookEntitie(bookEntitieMock)

  const sut = await updatedBook(updateBookMock)

  expect(sut).toEqual(updateBookMock)
})

it('should return a throw error by required filds', async () => {
  const { updatedBook } = BookEntitie(bookEntitieMock)

  const sut = updatedBook({
    ...updateBookMock,
    title: '',
  })

  expect(sut).rejects.toThrow(throwBookMessages.areAllFieldsFilled)
})
