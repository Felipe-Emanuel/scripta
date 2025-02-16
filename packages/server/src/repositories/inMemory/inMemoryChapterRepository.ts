import { Chapter } from '@prisma/client'
import { IChapterRepository } from '../ChapterRepository'

let chapters: Chapter[] = []

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

  return {
    createChapter,
    getChapterById,
    updateChapter,
    getAllChapters,
    deleteChapter
  }
}
