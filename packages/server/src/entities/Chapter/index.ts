import { Chapter } from '@prisma/client'
import { throwChapterMessages } from './utils'
import { isAllAttributeFilled } from '@utils'
import { chapterSchema } from './chapterSchema'

export const ChapterEntitie = (chapter: Chapter) => {
  const createChapter = async (): Promise<Chapter> => {
    const isValidChapter = isAllAttributeFilled<Chapter>(chapter)

    if (!isValidChapter) throw new Error(throwChapterMessages.somethingWrong)

    const parsedChapter = chapterSchema.parse(chapter)

    return parsedChapter as Chapter
  }

  // const updateChapter = async () => {}

  return {
    createChapter
  }
}
