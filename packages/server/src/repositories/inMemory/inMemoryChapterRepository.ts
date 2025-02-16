import { Book, Chapter } from '@prisma/client'
import { IChapterRepository } from '../ChapterRepository'
import { bookEntitieMock } from '~/src/entities/Book/mocks'

let chapters: Chapter[] = []
const books: Book[] = [bookEntitieMock]

export const inMemoryChapterRepository = (): IChapterRepository => {
  const createChapter = async (chapter: Chapter): Promise<Chapter> => {
    const updatedChapter = (chapters = [{ ...chapters, ...chapter }])
    return updatedChapter.find((c) => c.bookId === chapter.bookId)
  }

  const getChapterById = async (chapterId: string): Promise<Chapter> => {
    const existentChapter = chapters.find((chapter) => chapter.id === chapterId)

    return existentChapter || null
  }

  const updateChapter = async (chapter: Chapter): Promise<Chapter> => {
    const existentChapter = chapters.find((oldChapter) => oldChapter.id === chapter.id)

    const updatedChapter = {
      ...existentChapter,
      id: existentChapter?.id,
      bookId: existentChapter?.bookId,
      createdAt: existentChapter?.createdAt,
      updatedAt: new Date()
    }

    return updatedChapter
  }

  const getAllChapters = async (bookId: string): Promise<Chapter[]> => {
    const allChapters = chapters.filter((chapter) => chapter.bookId === bookId)

    return allChapters || []
  }

  const deleteChapter = async (chapterId: string): Promise<string> => {
    chapters.filter((chapter) => chapter.bookId !== chapterId)

    return 'Capítulo deletado com sucesso!'
  }

  const getAllUpdatedChapters = async (userEmail: string): Promise<Chapter[]> => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const userBooks = books.filter((book) => book.userEmail === userEmail)

    const updatedChapters = chapters.filter((chapter) => {
      const isUserChapter = userBooks.some((book) => book.id === chapter.bookId)
      const isUpdatedToday = chapter.updatedAt >= today

      return isUserChapter && isUpdatedToday
    })

    return updatedChapters
  }

  return {
    createChapter,
    getChapterById,
    updateChapter,
    getAllChapters,
    deleteChapter,
    getAllUpdatedChapters
  }
}
