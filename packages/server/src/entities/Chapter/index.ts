import { Chapter } from '@prisma/client'
import { chapterSchema, newTitleSchema } from './chapterSchema'
import { chaptersSchema, TChaptersSchema } from './chaptersSchema'

export const ChapterEntitie = (chapter?: Chapter) => {
  const createChapter = async () => {
    const parsedChapter = chapterSchema.parse(chapter)

    return parsedChapter as Chapter
  }

  const patchChapterTitle = async (newChapterTitle: string) => {
    const { newTitle } = newTitleSchema.parse({ newTitle: newChapterTitle })

    return {
      ...chapter,
      chapterTitle: newTitle
    } as Chapter
  }

  const validBookdId = async (obj: TChaptersSchema) => {
    return chaptersSchema.parse(obj)
  }

  return {
    createChapter,
    validBookdId,
    patchChapterTitle
  }
}
