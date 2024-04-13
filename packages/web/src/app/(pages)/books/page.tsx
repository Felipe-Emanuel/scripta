import { Books } from '@features/books'

export default function BooksPage() {
  return (
    <Books.root>
      <section
        id="book-info"
        className="flex items-center justify-center flex-wrap md:flex-nowrap gap-4"
      >
        <Books.highlight />
        <Books.info />
      </section>
    </Books.root>
  )
}
