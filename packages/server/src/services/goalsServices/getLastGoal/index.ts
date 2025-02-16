import { Chapter, Goal } from '@prisma/client'
import { IGoalRepository } from '@repositories'
import { getLastGoalSchema } from '@schemas'

export type TGetLastGoalRequest = {
  action: Pick<IGoalRepository, 'getLastGoal' | 'updateGoal'>
  paramUserEmail: string
  chapters: Chapter[]
}

type TGetLastGoalResponse = Goal

export const GetLastGoalService = async ({
  action,
  chapters,
  paramUserEmail
}: TGetLastGoalRequest): Promise<TGetLastGoalResponse | null> => {
  const { getLastGoal, updateGoal } = action

  const { userEmail } = getLastGoalSchema.parse({ userEmail: paramUserEmail })

  const existentGoal = await getLastGoal(userEmail)

  if (!existentGoal) return null

  const totalWords = chapters.reduce((acc, chapter) => acc + (chapter.wordsCounter || 0), 0)

  const goal: Goal = {
    ...existentGoal,
    words: totalWords
  }

  if (totalWords > existentGoal.words) {
    await updateGoal(goal.email, totalWords, existentGoal.goal)
  }

  return goal || null
}
