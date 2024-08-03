import { Chapter } from '@prisma/client'

export interface IChapterRepository {
  createChapter: (chapter: Chapter) => Promise<Chapter>
}
