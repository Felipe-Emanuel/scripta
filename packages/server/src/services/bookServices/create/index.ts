import { BookEntitie } from '@entities/Book'
import { IBooksRepository } from '@repositories'
import { Book } from '@prisma/client'
import { v4 as uuiv4 } from 'uuid'
import { throwBookMessages } from '@entities/Book/utils'

export type TCreateBookServiceRequest = {
  actions: Pick<IBooksRepository, 'createBook' | 'getAllBooks'>
  book: Book
  userEmail: string
}

type TCreateBookServiceResponse = Book

export const CreateBookService = async ({
  actions,
  book,
  userEmail
}: TCreateBookServiceRequest): Promise<TCreateBookServiceResponse> => {
  const { createBook, getAllBooks } = actions

  const allBooks = await getAllBooks(userEmail)

  const alreadyExists = allBooks.find((b) => b.title === book.title)

  if (alreadyExists) {
    throw new Error(throwBookMessages.alreadyExists)
  }

  const { setBook } = BookEntitie({
    ...book,
    userEmail,
    id: uuiv4(),
    createdAt: new Date(),
    updatedAt: new Date(),
    hits: 0
  })

  const newBook = await setBook()

  await createBook(newBook, userEmail)

  return newBook
}
