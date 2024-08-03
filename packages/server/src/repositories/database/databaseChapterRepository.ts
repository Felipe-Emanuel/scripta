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

  return {
    createChapter
  }
}
