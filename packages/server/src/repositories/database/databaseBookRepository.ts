import { prisma } from 'src/lib'
import { Book } from '@prisma/client'
import { IBooksRepository } from '@repositories'
import { TUpdateBookService } from '@types'
import { TGetAllBooksServiceResponse } from '@services'

export const databaseBookRepository = (): IBooksRepository => {
  const createBook = async (book: Book, authorId: string): Promise<Book> => {
    const newBook = await prisma.book.create({
      data: {
        ...book,
        userId: authorId
      }
    })

    return newBook
  }

  const getAllBooks = async (
    authorId: string,
    onlyFirstChapter: boolean
  ): Promise<TGetAllBooksServiceResponse> => {
    const books = await prisma.book.findMany({
      where: { userId: authorId },
      include: {
        chapters: {
          orderBy: { createdAt: 'desc' },
          take: onlyFirstChapter ? 1 : undefined
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    const booksWithWordCount = books.map((book) => ({
      id: book.id,
      title: book.title,
      description: book.description,
      socialLink: book.socialLink,
      heroPathUrl: book.heroPathUrl,
      Gender: book.Gender,
      Theme: book.Theme,
      hits: book.hits,
      totalWords: book.chapters.reduce((sum, chapter) => sum + chapter.wordsCounter, 0),
      conclued: book.conclued,
      isActive: book.isActive
    }))

    return booksWithWordCount || []
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
    return await prisma.book.delete({
      where: {
        id: bookId
      }
    })
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

  const getBookById = async (bookId: string): Promise<Book> => {
    const existentBook = await prisma.book.findUniqueOrThrow({
      where: {
        id: bookId
      }
    })

    return existentBook || null
  }

  return {
    getAllBooks,
    createBook,
    deleteBook,
    toggleIsActiveBook,
    toggleConcluedBook,
    updateBook,
    getBookById
  }
}
