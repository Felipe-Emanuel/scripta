import { Goal } from '@prisma/client'
import { progressGoal } from '@utils'
import { randomUUID } from 'crypto'

const goal = 2500
const words = 2000

const goalCompletePercent = progressGoal(words, goal)

export const mockGoal: Goal = {
  goal,
  words,
  createdAt: new Date(),
  email: 'foo@app.com',
  goalComplete: goalCompletePercent >= 100,
  goalCompletePercent,
  id: randomUUID(),
  updatedAt: new Date(),
}
