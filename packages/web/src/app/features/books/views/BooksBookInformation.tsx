import { BookInformation } from '@features/BookInformation'

export function BooksBookInformation() {
  return (
    <BookInformation.root>
      <BookInformation.actions />
      <BookInformation.header />
      <BookInformation.cardInfo />
    </BookInformation.root>
  )
}
