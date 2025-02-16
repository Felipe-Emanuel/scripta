import { Chapter } from '@prisma/client'
import { z } from 'zod'
import { ChapterEntitie } from '@entities/Chapter'
import { throwChapterMessages } from '@entities/Chapter/utils'
import { IChapterRepository } from '@repositories'

export type TPatchChapterTitleServiceRequest = {
  chapterId: string
  newTitle: string
  actions: Pick<IChapterRepository, 'getChapterById' | 'updateChapter'>
}

type TPatchChapterTitleServiceResponse = Chapter

export const PatchChapterTitleService = async ({
  chapterId,
  newTitle,
  actions
}: TPatchChapterTitleServiceRequest): Promise<TPatchChapterTitleServiceResponse> => {
  const { getChapterById, updateChapter } = actions

  const paramSchema = z.object({
    chapterId: z.string({
      required_error: throwChapterMessages.idRequired
    })
  })

  paramSchema.parse({ chapterId })

  const bodySchema = z.object({
    newChapterTitle: z.string({
      required_error: throwChapterMessages.idRequired
    })
  })

  const { newChapterTitle } = bodySchema.parse({ newChapterTitle: newTitle })

  const existingChapter = await getChapterById(chapterId)

  const { patchChapterTitle } = ChapterEntitie({
    ...existingChapter,
    chapterTitle: newChapterTitle,
    updatedAt: new Date()
  })

  const patchedChapter = await patchChapterTitle(newChapterTitle)

  await updateChapter(patchedChapter)

  return patchedChapter
}
