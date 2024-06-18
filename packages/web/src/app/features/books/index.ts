import { BookMyOwnBooks } from './views/BookMyOwnBooks'
import { BookNewBook } from './views/BookNewBook'
import { BooksBookInformation } from './views/BooksBookInformation'
import { BooksHighlight } from './views/BooksHighlight'
import { BooksRoot } from './views/BooksRoot'

export const Books = {
  root: BooksRoot,
  highlight: BooksHighlight,
  info: BooksBookInformation,
  newBook: BookNewBook,
  ownBooks: BookMyOwnBooks
}
