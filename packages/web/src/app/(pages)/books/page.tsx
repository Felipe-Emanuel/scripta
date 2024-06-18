import { Books } from '@features/books'
import { mainSectionTV } from './BooksTV'

export default function BooksPage() {
  return (
    <Books.root>
      <Books.newBook />
      <section id="book-info" className={mainSectionTV()}>
        <Books.highlight />
        <Books.info />
      </section>
      <section>
        <Books.ownBooks />
      </section>
    </Books.root>
  )
}
