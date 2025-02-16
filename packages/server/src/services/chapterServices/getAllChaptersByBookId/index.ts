import { Chapter } from '@prisma/client'
import { ChapterEntitie } from '~/src/entities/Chapter'
import { IChapterRepository } from '~/src/repositories'

export type TGetAllChaptersByBookIdServiceRequest = {
  action: Pick<IChapterRepository, 'getAllChapters'>
  bookId: string
}

type TGetAllChaptersByBookIdServiceResponse = Chapter[]

export const GetAllChaptersByBookIdService = async ({
  action,
  bookId
}: TGetAllChaptersByBookIdServiceRequest): Promise<TGetAllChaptersByBookIdServiceResponse> => {
  const { getAllChapters } = action

  const { validBookdId } = ChapterEntitie()

  const checkedBookId = await validBookdId({
    bookId
  })

  const chapters = await getAllChapters(checkedBookId.bookId)

  return chapters
}
