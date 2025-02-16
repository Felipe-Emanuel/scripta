import { Chapter } from '@prisma/client'

export interface IChapterRepository {
  createChapter: (chapter: Chapter) => Promise<Chapter>
  getChapterById: (chapterId: string) => Promise<Chapter>
  updateChapter: (chapter: Chapter) => Promise<Chapter>
  getAllChapters: (bookId: string) => Promise<Chapter[]>
  deleteChapter: (chapterId: string) => Promise<string>
}
