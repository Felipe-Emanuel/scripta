import { IChapterRepository } from '@repositories'
import { throwChapterMessages } from '~/src/entities/Chapter/utils'
import { deleteChapterParamSchema } from '@schemas'

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

  const { chapterId } = deleteChapterParamSchema.parse({ chapterId: paramChapterId })

  const currentChapter = getChapterById(chapterId)

  if (!currentChapter) throw new Error(throwChapterMessages.notFound)

  await deleteChapter(chapterId)

  return 'Capítulo deletado com sucesso!'
}
