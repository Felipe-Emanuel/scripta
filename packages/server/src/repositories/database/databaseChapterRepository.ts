import { Chapter } from '@prisma/client'
import { IChapterRepository } from '../ChapterRepository'
import { prisma } from '~/src/lib'

export const databaseChapterRepository = (): IChapterRepository => {
  const createChapter = async (chapter: Chapter): Promise<Chapter> => {
    const newChapter = await prisma.chapter.create({
      data: chapter
    })

    return newChapter
  }

  const getChapterById = async (chapterId: string): Promise<Chapter> => {
    const existentChapter = await prisma.chapter.findUnique({
      where: {
        id: chapterId
      }
    })

    return existentChapter || null
  }

  const updateChapter = async (chapter: Chapter): Promise<Chapter> => {
    const updatedChapter = await prisma.chapter.update({
      where: {
        id: chapter.id
      },
      data: chapter
    })

    return updatedChapter || null
  }

  const getAllChapters = async (bookId: string): Promise<Chapter[]> => {
    const allChapters = await prisma.chapter.findMany({
      where: {
        bookId
      },
      orderBy: {
        createdAt: 'asc'
      }
    })

    return allChapters || []
  }

  const deleteChapter = async (chapterId: string): Promise<string> => {
    await prisma.chapter.delete({
      where: {
        id: chapterId
      }
    })

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
