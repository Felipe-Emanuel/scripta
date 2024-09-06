import { Chapter } from '@prisma/client'
import { chapterSchema } from './chapterSchema'

export const ChapterEntitie = (chapter: Chapter) => {
  const createChapter = async (): Promise<Chapter> => {
    const parsedChapter = chapterSchema.parse(chapter)

    return parsedChapter as Chapter
  }

  return {
    createChapter
  }
}
