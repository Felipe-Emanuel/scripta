import { IChapterRepository } from '@repositories'
import { TGetChapterByIdSchemaResponse } from '@schemas'
import { throwChapterMessages } from '@utils'

export type TGetChapterByIdServiceRequest = {
  chapterId: string
  action: Pick<IChapterRepository, 'getChapterById'>
}

type TGetChapterByIdServiceResponse = TGetChapterByIdSchemaResponse

export const GetChapterByIdService = async ({
  chapterId,
  action
}: TGetChapterByIdServiceRequest): Promise<TGetChapterByIdServiceResponse> => {
  const { getChapterById } = action

  if (!chapterId) throw new Error(throwChapterMessages.idRequired)

  const chapterById = await getChapterById(chapterId)

  return chapterById || null
}
