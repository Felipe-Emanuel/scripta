import { IChapterRepository } from '@repositories'
import { Chapter } from '@prisma/client'

export type TGetAllChaptersByUserIdRequest = {
  action: Pick<IChapterRepository, 'getAllUpdatedChapters'>
  userId: string
}

type TgetAllChaptersByUserIdResponse = Chapter[]

export const GetAllChaptersByUserIdService = async ({
  action,
  userId
}: TGetAllChaptersByUserIdRequest): Promise<TgetAllChaptersByUserIdResponse> => {
  const { getAllUpdatedChapters } = action

  const chapters = await getAllUpdatedChapters(userId)

  return chapters || []
}
