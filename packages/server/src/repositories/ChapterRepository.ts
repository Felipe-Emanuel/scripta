import { Chapter } from '@prisma/client'
import {
  TCreateChapterSchemaResponse,
  TGetAllChaptersByBookIdSchemaResponse,
  TGetChapterByIdSchemaResponse,
  TPatchTitleSchemaResponse,
  TUpdateChapterSchemaRequest,
  TUpdateChapterSchemaResponse
} from '@schemas'

export interface IChapterRepository {
  createChapter: (chapter: TCreateChapterSchemaResponse) => Promise<TCreateChapterSchemaResponse>
  getChapterById: (chapterId: string) => Promise<TGetChapterByIdSchemaResponse>
  updateChapter: (
    chapter: TUpdateChapterSchemaRequest['updatedChapter'],
    newWords?: number
  ) => Promise<TUpdateChapterSchemaResponse>
  getAllChapters: (bookId: string) => Promise<TGetAllChaptersByBookIdSchemaResponse>
  deleteChapter: (chapterId: string) => Promise<string>
  getAllUpdatedChapters: (userId: string) => Promise<Chapter[]>
  patchChapterTitle: (chapterId: string, newTitle: string) => Promise<TPatchTitleSchemaResponse>
}
