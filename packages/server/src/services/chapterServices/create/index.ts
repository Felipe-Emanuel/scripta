import { Chapter } from '@prisma/client'
import { ChapterEntitie } from '@entities/Chapter'
import { IChapterRepository } from '@repositories'

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
    ...chapter,
    createdAt: new Date(),
    updatedAt: new Date(),
    chapterTitle: 'Novo capítulo'
  })

  const newChapter = await create()

  await createChapter(newChapter)

  return newChapter
}
