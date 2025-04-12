import { Book, Chapter } from '@prisma/client'
import { IChapterRepository } from '../ChapterRepository'
import { bookEntitieMock } from '~/src/shared/mocks'
import {
  TCreateChapterSchemaResponse,
  TGetAllChaptersByBookIdSchemaResponse,
  TGetChapterByIdSchemaResponse,
  TPatchTitleSchemaResponse,
  TUpdateChapterSchemaRequest,
  TUpdateChapterSchemaResponse
} from '@schemas'

let chapters: Chapter[] = []
const books: Book[] = [bookEntitieMock]

export const inMemoryChapterRepository = (): IChapterRepository => {
  const createChapter = async (
    chapter: TCreateChapterSchemaResponse
  ): Promise<TCreateChapterSchemaResponse> => {
    const updatedChapter = (chapters = [
      ...chapters,
      {
        ...chapters[0],
        ...chapter
      }
    ])
    return updatedChapter.find((c) => c.bookId === chapter.bookId)
  }

  const getChapterById = async (chapterId: string): Promise<TGetChapterByIdSchemaResponse> => {
    const existentChapter = chapters.find((chapter) => chapter.id === chapterId)

    return existentChapter || null
  }

  const updateChapter = async (
    chapter: TUpdateChapterSchemaRequest['updatedChapter']
  ): Promise<TUpdateChapterSchemaResponse> => {
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

  const getAllChapters = async (bookId: string): Promise<TGetAllChaptersByBookIdSchemaResponse> => {
    const allChapters = chapters.filter((chapter) => chapter.bookId === bookId)

    return allChapters || []
  }

  const deleteChapter = async (chapterId: string): Promise<string> => {
    chapters.filter((chapter) => chapter.bookId !== chapterId)

    return 'Capítulo deletado com sucesso!'
  }

  const getAllUpdatedChapters = async (userId: string): Promise<Chapter[]> => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const userBooks = books.filter((book) => book.userId === userId)

    const updatedChapters = chapters.filter((chapter) => {
      const isUserChapter = userBooks.some((book) => book.id === chapter.bookId)
      const isUpdatedToday = chapter.updatedAt >= today

      return isUserChapter && isUpdatedToday
    })

    return updatedChapters
  }

  const patchChapterTitle = async (
    chapterId: string,
    newTitle: string
  ): Promise<TPatchTitleSchemaResponse> => {
    const existentChapter = chapters.find((chapter) => chapter.id === chapterId)

    if (!existentChapter) {
      throw new Error('Chapter not found')
    }

    const updatedChapter = {
      ...existentChapter,
      chapterTitle: newTitle,
      updatedAt: new Date()
    }

    chapters = chapters.map((chapter) => (chapter.id === chapterId ? updatedChapter : chapter))

    return updatedChapter
  }

  return {
    createChapter,
    getChapterById,
    updateChapter,
    getAllChapters,
    deleteChapter,
    getAllUpdatedChapters,
    patchChapterTitle
  }
}
