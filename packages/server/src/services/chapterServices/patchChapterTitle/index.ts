import { IChapterRepository } from '@repositories'
import { TPatchTitleSchemaRequest, TPatchTitleSchemaResponse } from '@schemas'

export type TPatchChapterTitleServiceRequest = {
  chapterId: string
  body: TPatchTitleSchemaRequest
  actions: Pick<IChapterRepository, 'patchChapterTitle'>
}

type TPatchChapterTitleServiceResponse = TPatchTitleSchemaResponse

export const PatchChapterTitleService = async ({
  chapterId,
  body,
  actions
}: TPatchChapterTitleServiceRequest): Promise<TPatchChapterTitleServiceResponse> => {
  const { patchChapterTitle } = actions

  const { title: newTitle } = body

  const patchedChapter = await patchChapterTitle(chapterId, newTitle)

  return patchedChapter
}
