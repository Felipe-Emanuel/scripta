import { Goals } from '@prisma/client'
import { TGoalsFilter } from '@types'

export interface IGoalRepository {
  createGoals: (goals: Goals) => Promise<Goals[]>
  getGoalsByFilter: (
    email: string,
    filter: TGoalsFilter,
    filterValue: number,
  ) => Promise<Goals[]>
  patchGoalComplete: (id: string) => Promise<Goals>
}
