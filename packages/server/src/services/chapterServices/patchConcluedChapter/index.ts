import { IChapterRepository } from '@repositories'
import { TChapterConluedSchemaResponse } from '@schemas'

export type TPatchConcluedChapterServiceRequest = {
  chapterIdToBeEdited: string
  actions: Pick<IChapterRepository, 'getChapterById' | 'updateChapter'>
}

type TPatchConcluedChapterServiceResponse = TChapterConluedSchemaResponse

export const PatchConcluedChapterService = async ({
  chapterIdToBeEdited,
  actions
}: TPatchConcluedChapterServiceRequest): Promise<TPatchConcluedChapterServiceResponse> => {
  const { getChapterById, updateChapter } = actions

  const existingChapter = await getChapterById(chapterIdToBeEdited)

  const patchedChapter = { ...existingChapter, isConclued: !existingChapter.isConclued }

  const newWords = 0
  await updateChapter(patchedChapter, newWords)

  return patchedChapter
}
