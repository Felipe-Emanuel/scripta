import { Book, Character } from '@prisma/client'

export type TBookWithCharacters = {
  book: Book
  characters: Character[]
}
