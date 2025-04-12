import { Chapter } from '@prisma/client'
import { IGoalRepository } from '@repositories'
import { TGetDailyProgressSchemaResponse } from '~/src/shared/schemas'

export type TGetLastGoalRequest = {
  action: Pick<IGoalRepository, 'getLastGoal' | 'updateGoal'>
  userId: string
  chapters: Chapter[]
}

type TGetLastGoalResponse = TGetDailyProgressSchemaResponse

export const GetLastGoalService = async ({
  action,
  chapters,
  userId
}: TGetLastGoalRequest): Promise<TGetLastGoalResponse | null> => {
  const { getLastGoal, updateGoal } = action

  const existentGoal = await getLastGoal(userId)

  if (!existentGoal) return null

  const totalWords = chapters.reduce((acc, chapter) => acc + (chapter.wordsCounter || 0), 0)

  const goal = {
    ...existentGoal,
    words: totalWords,
    userId
  }

  if (totalWords > existentGoal.words) {
    await updateGoal(goal.userId, totalWords, existentGoal.goal)
  }

  return goal || null
}
