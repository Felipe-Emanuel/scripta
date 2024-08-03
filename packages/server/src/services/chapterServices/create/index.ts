import { Chapter } from '@prisma/client'
import { ChapterEntitie } from '~/src/entities/Chapter'
import { IChapterRepository } from '~/src/repositories/ChapterRepository'
import { v4 as uuiv4 } from 'uuid'

export type TCreateChapterServiceRequest = {
  action: Pick<IChapterRepository, 'createChapter'>
  chapter: Chapter
}

type TCreateChapterServiceResponse = Chapter

export const CreateChapterService = async ({
  action,
  chapter
}: TCreateChapterServiceRequest): Promise<TCreateChapterServiceResponse> => {
  const { createChapter } = action

  const { createChapter: create } = ChapterEntitie({
    id: uuiv4(),
    createdAt: new Date(),
    updatedAt: new Date(),
    ...chapter
  })

  const newChapter = await create()

  await createChapter(newChapter)

  return newChapter
}
