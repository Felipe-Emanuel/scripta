import { prisma } from 'src/lib'
import { Book } from '@prisma/client'
import { IBooksRepository } from '@repositories'
import { TUpdateBookService } from '@types'
import { TGetAllBooksServiceResponse } from '~/src/services'

export const databaseBookRepository = (): IBooksRepository => {
  const createBook = async (book: Book): Promise<Book[]> => {
    const newBook = await prisma.book.create({
      data: book
    })

    return [newBook]
  }

  const getAllBooks = async (
    userEmail: string,
    onlyFirstChapter: boolean
  ): Promise<TGetAllBooksServiceResponse> => {
    const books = await prisma.book.findMany({
      where: {
        userEmail
      },
      include: {
        characters: true,
        reactions: true,
        chapters: {
          orderBy: { createdAt: 'desc' },
          take: onlyFirstChapter ? 1 : undefined
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return books || []
  }

  const updateBook = async (bookId: string, updatedBook: TUpdateBookService): Promise<Book> => {
    const existentBook = await prisma.book.findUniqueOrThrow({
      where: {
        id: bookId
      }
    })

    if (existentBook) {
      return await prisma.book.update({
        where: {
          id: bookId
        },
        data: {
          ...existentBook,
          ...updatedBook
        }
      })
    }

    return null
  }

  const deleteBook = async (bookId: string): Promise<Book> => {
    const existentBook = await prisma.book.findUniqueOrThrow({
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

  const toggleConcluedBook = async (bookId: string): Promise<Book> => {
    const existentBook = await prisma.book.findUniqueOrThrow({
      where: {
        id: bookId
      }
    })

    const conclued = existentBook.conclued ? false : true

    if (existentBook) {
      return await prisma.book.update({
        where: { id: bookId },
        data: {
          ...existentBook,
          conclued
        }
      })
    }

    return null
  }

  return {
    getAllBooks,
    createBook,
    deleteBook,
    toggleIsActiveBook,
    toggleConcluedBook,
    updateBook
  }
}
