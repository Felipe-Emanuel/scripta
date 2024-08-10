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
    const existentChapter = await prisma.chapter.findFirst({
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

  return {
    createChapter,
    getChapterById,
    updateChapter
  }
}
