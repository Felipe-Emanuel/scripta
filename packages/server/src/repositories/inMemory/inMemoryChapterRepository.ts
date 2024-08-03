import { Chapter } from '@prisma/client'
import { IChapterRepository } from '../ChapterRepository'

let chapters: Chapter[] = []

export const inMemoryChapterRepository = (): IChapterRepository => {
  const createChapter = async (chapter: Chapter): Promise<Chapter> => {
    const updatedChapter = (chapters = [{ ...chapters, ...chapter }])
    return updatedChapter.find((c) => c.bookId === chapter.bookId)
  }

  return {
    createChapter
  }
}
