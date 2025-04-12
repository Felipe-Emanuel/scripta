import { IChapterRepository } from '@repositories'
import { TGetAllChaptersByBookIdSchemaResponse } from '@schemas'

export type TGetAllChaptersByBookIdServiceRequest = {
  action: Pick<IChapterRepository, 'getAllChapters'>
  bookId: string
}

type TGetAllChaptersByBookIdServiceResponse = TGetAllChaptersByBookIdSchemaResponse

export const GetAllChaptersByBookIdService = async ({
  action,
  bookId
}: TGetAllChaptersByBookIdServiceRequest): Promise<TGetAllChaptersByBookIdServiceResponse> => {
  const { getAllChapters } = action

  const chapters = await getAllChapters(bookId)

  return chapters
}
