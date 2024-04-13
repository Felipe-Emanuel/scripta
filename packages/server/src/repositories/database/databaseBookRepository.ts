import { prisma } from 'src/lib'
import { Book } from '@prisma/client'
import { IBooksRepository } from '@repositories'

export const databaseBookRepository = (): IBooksRepository => {
  async function createBook(book: Book): Promise<Book[]> {
    const newBook = await prisma.book.create({
      data: book
    })

    return [newBook]
  }

  const getAllBooks = async (userEmail: string): Promise<Book[]> => {
    const books = await prisma.book.findMany({
      where: {
        userEmail
      },
      include: {
        characters: true,
        reactions: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return books || []
  }

  const deleteBook = async (bookId: string): Promise<Book> => {
    const existentBook = await prisma.book.findUnique({
      where: {
        id: bookId
      }
    })

    if (existentBook) {
      return await prisma.book.delete({
        where: {
          id: existentBook.id
        }
      })
    }

    return null
  }

  const toggleIsActiveBook = async (bookId: string): Promise<Book> => {
    const existentBook = await prisma.book.findUniqueOrThrow({
      where: {
        id: bookId
      }
    })

    const isActive = existentBook.isActive ? false : true

    if (existentBook) {
      return await prisma.book.update({
        where: { id: bookId },
        data: {
          ...existentBook,
          isActive
        }
      })
    }

    return null
  }

  return {
    getAllBooks,
    createBook,
    deleteBook,
    toggleIsActiveBook
  }
}
