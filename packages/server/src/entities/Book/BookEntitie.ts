import { Book, Character } from '@prisma/client'

type TBookWithCharacters = {
  book: Book
  characters: Character[]
}

export const BookEntitie = (book: Book) => {
  const setBook = () => {
    if (!book.userId)
      throw new Error('Um livro não pode estar sem um usuário relacionado')

    return book
  }

  const getBookCharacters = (bookWithCharacters: TBookWithCharacters) => {
    if (bookWithCharacters.characters.length) return book

    throw new Error('Este livro ainda não contém nenhum personagem registrado')
  }

  return {
    setBook,
    getBookCharacters,
  }
}
