import { BookEntitie } from './BookEntitie'
import { todo } from 'node:test'
import { randomUUID } from 'node:crypto'
import { Book } from '@prisma/client'
import { isAnyAttributeundefined, isBase64, isLink } from '../../utils'

const bookEntitie: Book = {
  conclued: true,
  createdAt: new Date(),
  description: 'Book description Fake',
  heroPathUrl: 'OGyClxpf/dddCn6S8yobkg==',
  id: randomUUID(),
  publishedUrl: 'https://linktobook.com',
  title: 'Book Title Fake',
  updatedAt: new Date(),
  userId: randomUUID(),
}

it('should create a new book entity', () => {
  const { setBook } = BookEntitie(bookEntitie)

  const books = setBook()

  expect(bookEntitie).toEqual(books)
  expect(books.title).toEqual('Book Title Fake')
})

it('should check if required fields are valid', () => {
  expect(bookEntitie.userId).not.toBe('')
})

it('should create a book with all fields filled', () => {
  const areAllFieldsFilled = isAnyAttributeundefined(bookEntitie)

  expect(areAllFieldsFilled).toBeTruthy()
})

it('should valid if publishedUrl is a URL', () => {
  const isValidLink = isLink(bookEntitie.publishedUrl)

  expect(isValidLink).toBeTruthy()
})

it('should able to contais a base64 at heroPathUrl', () => {
  const isValidLink = isBase64(bookEntitie.heroPathUrl)

  expect(isValidLink).toBeTruthy()
})

todo('test if updatedAt will be updated')
todo('test if createdAt is updated when book is edited')
