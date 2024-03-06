import { Goals } from '@prisma/client'
import { randomUUID } from 'crypto'

export const mockGoals: Goals = {
  createdAt: new Date(),
  day: new Date().getDay(),
  email: 'foo@app.com',
  goalComplete: true,
  goalCompletePercent: 100,
  id: randomUUID(),
  month: new Date().getMonth() + 1,
  updatedAt: new Date(),
  week: 1,
}
