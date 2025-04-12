import { IChapterRepository } from '@repositories'
import { throwChapterMessages } from '@utils'

export type TDeleteChapterServiceRequest = {
  actions: Pick<IChapterRepository, 'getChapterById' | 'deleteChapter'>
  paramChapterId: string
}

type TDeleteChapterServiceResponse = string

export const DeleteChapterService = async ({
  actions,
  paramChapterId
}: TDeleteChapterServiceRequest): Promise<TDeleteChapterServiceResponse> => {
  const { getChapterById, deleteChapter } = actions

  const currentChapter = getChapterById(paramChapterId)

  if (!currentChapter) throw new Error(throwChapterMessages.notFound)

  await deleteChapter(paramChapterId)

  return 'Capítulo deletado com sucesso!'
}
