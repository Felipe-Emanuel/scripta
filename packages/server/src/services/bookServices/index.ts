import { Book } from '@prisma/client'
import { BookEntitie } from '../../entities/Book'
import { v4 as uuiv4 } from 'uuid'
import { inMemoryBooksRepository } from '../../repositories/inMemory/inMemoryBooksRepository'

export type TCreateBookServiceRequest = {
  title: string
  description: string
  publishedUrl: string
  userId: string
  heroPathUrl: string
  conclued: boolean
}

type TCreateBookServiceResponse = Book

export const CreateBookService = async ({
  conclued,
  description,
  heroPathUrl,
  publishedUrl,
  title,
  userId,
}: TCreateBookServiceRequest): Promise<TCreateBookServiceResponse> => {
  const { createBook, findBookWithExistingTitle } = inMemoryBooksRepository()

  const existingBookWithThisTitle = await findBookWithExistingTitle(title)

  if (existingBookWithThisTitle) {
    throw new Error('Já existe um livro registrado com este título.')
  }

  const { setBook } = BookEntitie({
    id: uuiv4(),
    createdAt: new Date(),
    updatedAt: new Date(),
    conclued,
    description,
    heroPathUrl,
    publishedUrl,
    title,
    userId,
  })
  const newBook = await setBook()

  await createBook(newBook)

  return newBook
}
