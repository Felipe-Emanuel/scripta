import { IGoalRepository } from '@repositories'
import { TCreateGoalResponseSchema, TCreateGoalSchema } from '@schemas'
import { throwGoalsMessages } from '@utils'

export type TCreateGoalsRequest = {
  action: Pick<IGoalRepository, 'createGoals'>
  userId: string
  goals: TCreateGoalSchema
}

export type TCreateGoalsResponse = TCreateGoalResponseSchema

export type TGoalEntitie = {
  goal: number
  goalComplete: boolean
  goalCompletePercent: number
  words: number
  userId: string
}

export const CreateGoalsService = async ({
  action,
  userId,
  goals: body
}: TCreateGoalsRequest): Promise<TCreateGoalsResponse> => {
  const { createGoals } = action

  const { goal, goalComplete, goalCompletePercent, words } = body.goal

  if (!userId) throw new Error(throwGoalsMessages.goalNotFound)

  const goalRecord: TGoalEntitie = {
    goal,
    goalComplete,
    goalCompletePercent,
    words,
    userId
  }

  const newGoal = await createGoals(goalRecord)

  const { ...newGoalCreated } = newGoal

  return newGoalCreated
}
