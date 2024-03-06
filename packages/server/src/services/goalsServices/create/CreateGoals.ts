import { Goals } from '@prisma/client'
import { GoalsEntitie } from 'src/entities/Goals/GoalsEntitie'
import { throwGoalsMessages } from 'src/entities/Goals/utils'
import { IGoalRepository } from 'src/repositories/GoalRepository'
import { getWeekNumber } from 'src/shared/utils/dates'
import { v4 as uuidv4 } from 'uuid'

export type TCreateGoalsRequest = {
  action: Pick<IGoalRepository, 'createGoals'>
  email: string
  goals: Goals
}

export type TCreateGoalsResponse = Goals[]

export const CreateGoalsService = async ({
  action,
  email,
  goals,
}: TCreateGoalsRequest): Promise<TCreateGoalsResponse> => {
  const { createGoals } = action

  if (goals.email !== email) throw new Error(throwGoalsMessages.goalNotFound)

  const { setGoal } = GoalsEntitie(email, [goals])

  const newGoal = await setGoal({
    ...goals,
    id: uuidv4(),
    createdAt: new Date(),
    updatedAt: new Date(),
    week: getWeekNumber(new Date()),
    day: new Date().getDate(),
    month: new Date().getMonth() + 1,
    email,
  })

  await createGoals(newGoal)

  return [newGoal]
}
