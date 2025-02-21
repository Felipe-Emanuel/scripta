import { Goal } from '@prisma/client'
import { GoalsEntitie } from 'src/entities/Goals'
import { throwGoalsMessages } from 'src/entities/Goals/utils'
import { IGoalRepository } from 'src/repositories/GoalRepository'
import { v4 as uuidv4 } from 'uuid'
import { TCreateGoalSchema } from '@schemas'

export type TCreateGoalsRequest = {
  action: Pick<IGoalRepository, 'createGoals'>
  email: string
  goals: TCreateGoalSchema
}

export type TCreateGoalsResponse = Goal[]

export const CreateGoalsService = async ({
  action,
  email,
  goals: body
}: TCreateGoalsRequest): Promise<TCreateGoalsResponse> => {
  const { createGoals } = action

  if (body.email !== email) throw new Error(throwGoalsMessages.goalNotFound)

  const { goal, goalComplete, goalCompletePercent, words } = body.goal

  const goalRecord = {
    goal,
    goalComplete,
    goalCompletePercent,
    words,
    id: uuidv4(),
    createdAt: new Date(),
    updatedAt: new Date(),
    email
  }

  const { setGoal } = GoalsEntitie(email, [goalRecord])

  const newGoal = await setGoal({
    ...goalRecord,
    id: uuidv4(),
    createdAt: new Date(),
    updatedAt: new Date(),
    email
  })

  await createGoals(newGoal)

  return [newGoal]
}
