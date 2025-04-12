import { IChapterRepository } from '@repositories'
import { TCreateChapterSchemaBody, TCreateChapterSchemaResponse } from '@schemas'

export type TCreateChapterServiceRequest = {
  action: Pick<IChapterRepository, 'createChapter'>
  chapter: TCreateChapterSchemaBody['chapter']
}

type TCreateChapterServiceResponse = TCreateChapterSchemaResponse

export const CreateChapterService = async ({
  action,
  chapter
}: TCreateChapterServiceRequest): Promise<TCreateChapterServiceResponse> => {
  const { createChapter } = action

  const newChapter = await createChapter({
    ...chapter,
    chapterTitle: 'Novo capítulo'
  })

  return newChapter
}
