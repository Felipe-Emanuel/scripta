import { Chapter } from '@prisma/client'
import { IChapterRepository } from '@repositories'
import { chapterByIdSchema } from '@entities/Chapter/chaptersSchema'

export type TPatchConcluedChapterServiceRequest = {
  chapterIdToBeEdited: string
  actions: Pick<IChapterRepository, 'getChapterById' | 'updateChapter'>
}

type TPatchConcluedChapterServiceResponse = Chapter

export const PatchConcluedChapterService = async ({
  chapterIdToBeEdited,
  actions
}: TPatchConcluedChapterServiceRequest): Promise<TPatchConcluedChapterServiceResponse> => {
  const { getChapterById, updateChapter } = actions

  const { chapterId } = chapterByIdSchema.parse({ chapterId: chapterIdToBeEdited })

  const existingChapter = await getChapterById(chapterId)

  const patchedChapter = { ...existingChapter, isConclued: !existingChapter.isConclued }

  await updateChapter(patchedChapter)

  return patchedChapter
}
