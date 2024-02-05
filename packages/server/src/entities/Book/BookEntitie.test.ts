import { BookEntitie } from './BookEntitie'
import { todo } from 'node:test'
import { isAnyAttributeUndefined, isBase64, isLink } from '../../shared/utils'
import { bookEntitieMock, bookWithCharactersMocked } from './mocks'
import { throwMessages } from './utils'

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

  expect(sut).rejects.toThrow(throwMessages.bookWithoutUserId)
})

it('should check if required fields are valid', () => {
  expect(bookEntitieMock.userId).not.toBe('')
})

it('should create a book with all fields filled', () => {
  const areAllFieldsFilled = isAnyAttributeUndefined(bookEntitieMock)

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

  const sut = await getBookWithCharacters(bookWithCharactersMocked)

  expect(bookWithCharactersMocked).toEqual(sut)
})

it('should not return a book with character', async () => {
  const { getBookWithCharacters } = BookEntitie(bookEntitieMock)

  const sut = getBookWithCharacters({
    book: bookEntitieMock,
    characters: [],
  })

  expect(sut).rejects.toThrow(throwMessages.bookWithoutCharacters)
})

todo('test if updatedAt will be updated')
todo('test if createdAt is updated when book is edited')
