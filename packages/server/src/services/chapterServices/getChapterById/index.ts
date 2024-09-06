import { Chapter } from '@prisma/client'
import { throwChapterMessages } from '@entities/Chapter/utils'
import { IChapterRepository } from '@repositories'

export type TGetChapterByIdServiceRequest = {
  chapterId: string
  action: Pick<IChapterRepository, 'getChapterById'>
}

type TGetChapterByIdServiceResponse = Chapter

export const GetChapterByIdService = async ({
  chapterId,
  action
}: TGetChapterByIdServiceRequest): Promise<TGetChapterByIdServiceResponse> => {
  const { getChapterById } = action

  if (!chapterId) throw new Error(throwChapterMessages.idRequired)

  const chapterById = await getChapterById(chapterId)

  return chapterById || null
}
