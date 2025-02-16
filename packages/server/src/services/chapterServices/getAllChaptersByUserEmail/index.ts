import { IChapterRepository } from '@repositories'
import { Chapter } from '@prisma/client'
import { getLastGoalSchema } from '@schemas'

export type TGetAllChaptersByUserEmailRequest = {
  action: Pick<IChapterRepository, 'getAllUpdatedChapters'>
  paramUserEmail: string
}

type TGetAllChaptersByUserEmailResponse = Chapter[]

export const GetAllChaptersByUserEmailService = async ({
  action,
  paramUserEmail
}: TGetAllChaptersByUserEmailRequest): Promise<TGetAllChaptersByUserEmailResponse> => {
  const { getAllUpdatedChapters } = action

  const { userEmail } = getLastGoalSchema.parse({ userEmail: paramUserEmail })

  const chapters = await getAllUpdatedChapters(userEmail)

  return chapters
}
