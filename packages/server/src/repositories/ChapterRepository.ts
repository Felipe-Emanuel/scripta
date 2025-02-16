import { Chapter } from '@prisma/client'
import { TUpdateChapter } from '@types'

export interface IChapterRepository {
  createChapter: (chapter: Chapter) => Promise<Chapter>
  getChapterById: (chapterId: string) => Promise<Chapter>
  updateChapter: (chapter: TUpdateChapter, newWords?: number) => Promise<Chapter>
  getAllChapters: (bookId: string) => Promise<Chapter[]>
  deleteChapter: (chapterId: string) => Promise<string>
  getAllUpdatedChapters: (userEmail: string) => Promise<Chapter[]>
}
