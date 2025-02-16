import { IChapterRepository } from '@repositories'
import { deleteChapterSchema } from '~/src/entities/Chapter/chapterSchema'
import { throwChapterMessages } from '~/src/entities/Chapter/utils'

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

  const { chapterId } = deleteChapterSchema.parse({ chapterId: paramChapterId })

  const currentChapter = getChapterById(chapterId)

  if (!currentChapter) throw new Error(throwChapterMessages.notFound)

  await deleteChapter(chapterId)

  return 'Capítulo deletado com sucesso!'
}
